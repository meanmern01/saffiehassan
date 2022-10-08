import { useRef } from 'react';
import classNames from 'classnames';
import gsap from 'gsap';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { preloaderReadyState } from '@/atoms/preloader-ready';
import DefaultLayout from '@/components/layout/DefaultLayout';
import useIsomorphicLayoutEffect from '@/hooks/use-isomorphic-layout-effect';
import { PageContextProvider } from '@/contexts/page';
import { useOutroAnimation } from '@/hooks/use-outro-animation';
import AccessButton from '@/components/pages/testing/AccessButton';
import CameraIcon from '@/svg/camera.svg';
import GalleryIcon from '@/svg/gallery.svg';
import { userState } from '@/atoms/user';
import axios from 'axios';

const IntroductionPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const fileInput = useRef<HTMLInputElement>(null);
    const preloaderReady = useRecoilValue(preloaderReadyState);
    const setUser = useSetRecoilState(userState);
    const router = useRouter();
    const accept = '.jpg,.jpeg,.png,.webp,.avif,.heic,.bmp';

    const uploadPhoto = () => {
        if (fileInput.current) {
            fileInput.current.accept = accept;
            fileInput.current.click();
        }
    };

    const setPhotoAndProceed = (event: any) => {
        setUser((user) => ({ ...user, photo: event.target.files[0] }));
        // -----------------------
        console.log('testing photo', event.target.files[0]);
        const images = event.target.files[0];
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            },
        };
        const url = 'https://bivw7mc2w6.execute-api.us-east-2.amazonaws.com/book_one';
        axios
            .post(url, images, options)
            .then((res) => {
                console.log('RESPONSE ==== : ', res);
            })
            .catch((err) => {
                console.log('ERROR: ====', err);
            });
        // axios
        //     .post(`https://bivw7mc2w6.execute-api.us-east-2.amazonaws.com/book_one`, images)
        //     .then((response) => console.log(response, 'response================================'))
        //     .catch((err) => console.log(err));
        // localStorage.setItem('image', images);
        // https://bivw7mc2w6.execute-api.us-east-2.amazonaws.com/book_one
        // router.push('/analysis');
    };

    // Intro animation
    useIsomorphicLayoutEffect(() => {
        const tl = gsap.timeline({
            paused: true,
            defaults: { duration: 1, ease: 'power3.out' },
            onComplete: () => {
                tl.kill();
            },
        });
        tl.fromTo('.js-testing-access-btn', { x: -40, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.1 });
        if (preloaderReady) {
            tl.play();
        }
    }, [preloaderReady]);

    useOutroAnimation();

    return (
        <PageContextProvider value={props}>
            <DefaultLayout currentSection="Intro" className={classNames('wrapper')}>
                <div className="text-transition-container introduction-title-container">
                    <h1 className="introduction-title js-introduction-title">To start analysis</h1>
                </div>

                <div className="testing-access-row">
                    <AccessButton
                        title="Allow A.I. to scan your face"
                        icon={<CameraIcon />}
                        titlePosition="right"
                        className="testing-access__btn js-testing-access-btn"
                    />
                    <AccessButton
                        title="Allow A.I. access gallery"
                        icon={<GalleryIcon />}
                        titlePosition="left"
                        className="testing-access__btn js-testing-access-btn"
                        onClick={uploadPhoto}
                    >
                        <input
                            id="photo-upload-input"
                            ref={fileInput}
                            type="file"
                            accept={accept}
                            onChange={setPhotoAndProceed}
                            className="visually-hidden"
                        />
                        <label htmlFor="photo-upload-input" className="visually-hidden">
                            Ваше фото
                        </label>
                    </AccessButton>
                </div>
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
            bodyClass: 'testing-page',
        },
    };
};

export default IntroductionPage;
