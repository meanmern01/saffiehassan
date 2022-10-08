import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import gsap from 'gsap';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { preloaderReadyState } from '@/atoms/preloader-ready';
import DefaultLayout from '@/components/layout/DefaultLayout';
import useIsomorphicLayoutEffect from '@/hooks/use-isomorphic-layout-effect';
import DottedSquare from '@/components/shared/DottedSquare';
import BottomNav from '@/components/shared/BottomNav/BottomNav';
import IconButton from '@/components/shared/IconButton';
import ArrLeftIcon from '@/svg/arr-left.svg';
import ArrRightIcon from '@/svg/arr-right.svg';
import IntroductionForm from '@/components/pages/introduction/IntroductionForm';
import { PageContextProvider } from '@/contexts/page';
import { useOutroAnimation } from '@/hooks/use-outro-animation';
import { userState } from '@/atoms/user';
import axios from 'axios';
const IntroductionPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const leftBottomLink = useRef<HTMLAnchorElement>(null);
    const rightBottomLink = useRef<HTMLButtonElement>(null);
    const preloaderReady = useRecoilValue(preloaderReadyState);
    const [squareExpanded, setSquareExpanded] = useState(false);
    const [userName, setUserName] = useState('');
    const setUser = useSetRecoilState(userState);
    const [userNameConfirmed, setUserNameConfirmed] = useState(false);
    const [userOrigin, setUserOrigin] = useState('');
    const [userOriginConfirmed, setUserOriginConfirmed] = useState(false);
    const router = useRouter();

    function navigateBack() {
        if (userNameConfirmed) {
            setUserNameConfirmed(false);
        } else {
            router.push('/');
        }
    }

    function submitNameForm() {
        setUserNameConfirmed(true);
    }

    function submitOriginForm() {
        setUserOriginConfirmed(true);
    }
    const random = Math.floor(Math.random() * 100000000);

    const userDetails = {
        name: userName,
        origin: userOrigin,
        id: random,
    };
    function setCookie(cname: any, cvalue: any, exdays: any) {
        const d = new Date();
        d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
        let expires = 'expires=' + d.toUTCString();
        document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
    }
    function getCookie(cname: any) {
        let name = cname + '=';
        let decodedCookie = decodeURIComponent(typeof window !== 'undefined' && document.cookie);

        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    }
    useEffect(() => {
        checkCookie();
    }, []);
    console.log(process.env.REACT_APP, 'REACT_APP_localoooooo');

    function checkCookie() {
        let user = getCookie('details') && JSON.parse(getCookie('details'));
        console.log(user);
        if (user) {
            router.push('/');
            alert('Welcome again ' + user.name);
        } else {
            if (user != '' && user != null) {
                setCookie('details', JSON.stringify(userDetails), 30);
            }
        }
    }
    function proceed() {
        if (!userNameConfirmed) {
            submitNameForm();
            return;
        }

        if (userNameConfirmed && !userOriginConfirmed) {
            submitOriginForm();
            setCookie('details', JSON.stringify(userDetails), 30);
            //-------------------user details api
            console.log(getCookie('details') && JSON.parse(getCookie('details')), 'checkingggg');
            const user = getCookie('details') && JSON.parse(getCookie('details'));
            const userInfo = {
                name: user.name,
                city: user.origin,
                userId: user.id,
            };
            axios
                .post(
                    `${
                        process.env.REACT_APP == 'development'
                            ? process.env.REACT_APP_LOCAL
                            : process.env.REACT_APP_SERVER
                    }/api/auth/user`,
                    userInfo,
                )
                .then((response) => console.log(response, 'response================================'))
                .catch((err) => console.log(err));
            // axios
            //     .post(
            //         `${
            //             process.env.NODE_ENV == 'development'
            //                 ? process.env.REACT_APP_local
            //                 : process.env.REACT_APP_server
            //         }/api/auth/user`,
            //         userInfo,
            //     )
            //     .then((response) => console.log(response, 'response================================'))
            //     .catch((err) => console.log(err));
            return;
        }
    }

    useEffect(() => {
        if (userNameConfirmed) {
            setUser((user) => ({ ...user, name: userName }));
        }
    }, [userNameConfirmed, setUser, userName]);

    useEffect(() => {
        if (userOriginConfirmed) {
            setUser((user) => ({ ...user, origin: userOrigin }));
        }
    }, [userOriginConfirmed, setUser, userOrigin]);

    useEffect(() => {
        if (userNameConfirmed && userOriginConfirmed) {
            router.push(typeof router.query.returnUrl === 'string' ? router.query.returnUrl : '/'); // TODO: temp
        }
    }, [router, userNameConfirmed, userOriginConfirmed]);

    // Intro animation
    useIsomorphicLayoutEffect(() => {
        const tl = gsap.timeline({
            paused: true,
            defaults: { duration: 1, ease: 'power3.out' },
            onComplete: () => {
                tl.kill();
            },
        });

        tl.fromTo('.js-introduction-title', { yPercent: 100 }, { yPercent: 0 })
            .fromTo(
                ['.js-introduction-form', '.js-introduction-form-label'],
                { clipPath: 'inset(0% 50% 0% 50%)' },
                { clipPath: 'inset(0% 0% 0% 0%)' },
                0,
            )
            .fromTo(leftBottomLink.current, { opacity: 0, x: 20 }, { opacity: 1, x: 0 }, 0);

        if (preloaderReady) {
            tl.play();
        }
    }, [preloaderReady]);

    useOutroAnimation(() => setSquareExpanded(false));

    useEffect(() => {
        setSquareExpanded(true);
    }, []);

    return (
        <PageContextProvider value={props}>
            <DefaultLayout currentSection="Intro" className={classNames('wrapper')}>
                <div className="text-transition-container introduction-title-container">
                    <h1 className="introduction-title js-introduction-title">To start analysis</h1>
                </div>
                <div className="introduction-square js-introduction-square">
                    <DottedSquare expanded={squareExpanded} animated />
                </div>
                {!userNameConfirmed && (
                    <IntroductionForm
                        label="Introduce yourself"
                        inputValue={userName}
                        setInputValue={setUserName}
                        onFormSubmit={proceed}
                    />
                )}
                {userNameConfirmed && (
                    <IntroductionForm
                        label="Where are you from?"
                        inputValue={userOrigin}
                        setInputValue={setUserOrigin}
                        onFormSubmit={proceed}
                    />
                )}
                <BottomNav
                    leftSlot={
                        <IconButton
                            ref={leftBottomLink}
                            className="js-introduction-left-bottom-link"
                            icon={<ArrLeftIcon style={{ position: 'relative', top: 1, left: -1 }} />}
                            onClick={navigateBack}
                        >
                            Back
                        </IconButton>
                    }
                    rightSlot={
                        (!userNameConfirmed ? !!userName : !!userOrigin) && (
                            <IconButton
                                ref={rightBottomLink}
                                className="js-introduction-right-bottom-link"
                                icon={<ArrRightIcon style={{ position: 'relative', top: -1, left: 1 }} />}
                                iconPosition="right"
                                onClick={proceed}
                            >
                                Proceed
                            </IconButton>
                        )
                    }
                />
            </DefaultLayout>
        </PageContextProvider>
    );
};

type IntroductionPageServerSideProps = {
    //
};

export const getServerSideProps: GetServerSideProps<IntroductionPageServerSideProps> = async () => {
    return {
        props: {
            bodyClass: 'introduction-page',
        },
    };
};

export default IntroductionPage;
