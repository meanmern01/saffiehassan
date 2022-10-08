import classNames from 'classnames';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import DefaultLayout from '@/components/layout/DefaultLayout';
import { PageContextProvider } from '@/contexts/page';
import { useOutroAnimation } from '@/hooks/use-outro-animation';
import Link from '@/components/shared/Link';
import HeaderPadding from '@/components/layout/HeaderPadding';
import IconButton from '@/components/shared/IconButton';
import { usePrevious } from '@/hooks/use-previous';
import BottomNav from '@/components/shared/BottomNav/BottomNav';
import ArrLeftIcon from '@/svg/arr-left.svg';
import AboutIntroButton from '@/components/pages/about/AboutIntroButton/AboutIntroButton';
import useIsomorphicLayoutEffect from '@/hooks/use-isomorphic-layout-effect';
import { preloaderReadyState } from '@/atoms/preloader-ready';

const AboutPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const introEl = useRef<HTMLDivElement>(null);
    const contentEl = useRef<HTMLDivElement>(null);
    const [topicPicked, setTopicPicked] = useState(false);
    const [contentRendered, setContentRendered] = useState(false);
    const [data, setData] = useState([
        {
            id: 1,
            title: 'What is it?',
            content: `<p>The A.I. was developed by an Australian company called Skinstric.</p><p>Its goal is to help you improve your skin condition through deep analysis that allows to personalise skincare products specifically to you parametres.</p>`,
            proposeTesting: false,
        },
        {
            id: 2,
            title: 'Tell me about the team behind the A.I.',
            content: `<p>The team behind the A.I. consist of experienced scientist, pharmacist and engineers passionate about aesthetics.</p>`,
            proposeTesting: false,
        },
        {
            id: 3,
            title: 'What does it do?',
            content: `<p>Advanced A.I. analyses your photo and selects from the database only those ingredients that will be truly helpful for you specific requirements and skin pecularities.</p>`,
            proposeTesting: false,
        },
        {
            id: 4,
            title: 'What should I do to get my skin analysed?',
            content: `
                <p>There are three simple steps</p>
                <table>
                    <tbody>
                        <tr>
                            <td>01 Upload your photo</td>
                            <td>To analyse potential concerns A.I. would require a photo of your face.</td>
                        </tr>
                        <tr>
                            <td>02 Specify details</td>
                            <td>Add specific details A.I. might not have picked</td>
                        </tr>
                        <tr>
                            <td>03 Recieve your formula</td>
                            <td>Get your skincare formula. Replace or remove ingridients you do not want.</td>
                        </tr>
                    </tbody>
                </table>
            `,
            proposeTesting: false,
        },
        {
            id: 5,
            title: 'What would I get in the end?',
            content: `
                <p>Having finished the analysis A.I. provides you with the list of skincare products that could be examined and assambled on demand by the Skinstric professionals.</p>
                <img src="/upload/bottle.svg" alt=""></img>
                <p>Each products comes in a bottle with your parameters printed on the back and personal QR to access full information about you analysis and product details for ease of access</p>
                <p>Treating your skin has never been that simple</p>
            `,
            proposeTesting: true,
        },
    ]);
    const [activeI, setActiveI] = useState(0);
    const [activeIndex, setActiveIndex] = useState(data[activeI].id);
    const prevActiveI = usePrevious(activeI);
    const prevActiveIndex = usePrevious(activeIndex);
    const preloaderReady = useRecoilValue(preloaderReadyState);

    const chooseTopic = (index: number) => {
        const newData = [...data];
        newData.sort((a, b) => a.id - b.id);

        if (index === 3) {
            const deletedItems = newData.splice(index - 1, 1);
            newData.unshift(...deletedItems);
        }

        setData(newData);
        setTopicPicked(true);
        setActiveIndex(index);
    };

    const navigateBack = () => {
        // TODO
        if (typeof prevActiveIndex === 'number') {
            console.log({ activeIndex, prevActiveIndex });
            // setActiveIndex(prevActiveIndex);
        }
    };

    // Transition on topic pick
    useEffect(() => {
        if (topicPicked) {
            document.documentElement.classList.add('no-scroll');
            gsap.to(introEl.current, { duration: 1, ease: 'power3.out', y: '-50vh', opacity: 0 });
            gsap.fromTo(
                contentEl.current,
                { y: '50vh', opacity: 0 },
                {
                    duration: 1,
                    ease: 'power3.out',
                    y: 0,
                    delay: 0.1,
                    opacity: 1,
                    onComplete: () => {
                        setContentRendered(true);
                        document.documentElement.classList.remove('no-scroll');
                    },
                },
            );
        }
    }, [topicPicked]);

    useEffect(() => {
        const newActiveI = data.findIndex((obj) => obj.id === activeIndex);

        if (newActiveI !== prevActiveI) {
            const currentTitle = document.querySelector('.js-about-content-item__title-current');
            const nextTitle = document.querySelector('.js-about-content-item__title-next');

            if (currentTitle && nextTitle) {
                const currentTitleRect = currentTitle.getBoundingClientRect();
                const nextTitleRect = nextTitle.getBoundingClientRect();
                const translateY = -(nextTitleRect.top - currentTitleRect.top);

                gsap.to(window, { duration: 1, ease: 'power3.out', scrollTo: 0 });
                gsap.to('.js-about-content-item-current', {
                    duration: 1,
                    ease: 'power3.out',
                    y: translateY,
                    opacity: 0,
                });
                gsap.to(nextTitle, {
                    duration: 1,
                    ease: 'power3.out',
                    y: translateY,
                });
                gsap.to('.js-about-content-item-text-next', {
                    duration: 1,
                    ease: 'power3.out',
                    opacity: 1,
                    y: translateY,
                    delay: 0.05,
                    onComplete: () => {
                        setActiveI(newActiveI);
                    },
                });
            }
        }
    }, [data, activeIndex, prevActiveI]);

    useEffect(() => {
        gsap.set(['.js-about-content-item__title-current', '.js-about-content-item-text-current'], {
            clearProps: 'all',
        });
        gsap.fromTo(
            '.js-about-content-item__title-next',
            { opacity: 0, y: 40 },
            { duration: 1, ease: 'power3.out', opacity: 1, y: 0 },
        );
    }, [activeI]);

    // Intro animation
    useIsomorphicLayoutEffect(() => {
        const tl = gsap.timeline({
            paused: true,
            defaults: { duration: 1, ease: 'power3.out' },
            onComplete: () => {
                tl.kill();
            },
        });
        tl.fromTo('.js-about-intro-title', { yPercent: 100 }, { yPercent: 0 });

        if (preloaderReady) {
            tl.play();
        }
    }, [preloaderReady]);

    useOutroAnimation();

    return (
        <PageContextProvider value={props}>
            <DefaultLayout currentSection="Intro" className={classNames('wrapper js-about-container')}>
                <h1 className="visually-hidden">About A.I.</h1>

                {!contentRendered && (
                    <div ref={introEl} className="about-intro-row">
                        <AboutIntroButton
                            title={data[1 - 1].title}
                            position="left"
                            onButtonClick={() => chooseTopic(1)}
                        />

                        <div className="text-transition-container about-intro-title">
                            <div className="h3 js-about-intro-title">Hello, Eu, what would you like to learn?</div>
                        </div>

                        <AboutIntroButton
                            title={data[3 - 1].title}
                            position="right"
                            onButtonClick={() => chooseTopic(3)}
                        />
                    </div>
                )}

                {topicPicked && (
                    <div ref={contentEl} className="about-content-wrapper">
                        <div className="about-content">
                            <HeaderPadding />
                            {data.map((obj, i) =>
                                i === activeI || i === activeI + 1 ? (
                                    <div
                                        key={obj.id}
                                        className={classNames('about-content-item wysiwyg', {
                                            'js-about-content-item-current': i === activeI,
                                        })}
                                    >
                                        <IconButton
                                            icon={<span className="icon-square"></span>}
                                            className={classNames('about-content-item__title', {
                                                'about-content-item__title-current js-about-content-item__title-current':
                                                    i === activeI,
                                                'js-about-content-item__title-next': i === activeI + 1,
                                            })}
                                            onClick={() => setActiveIndex(obj.id)}
                                            style={{ pointerEvents: i === activeI ? 'none' : undefined }}
                                        >
                                            {obj.title}
                                        </IconButton>
                                        <div
                                            className={classNames({
                                                'about-content-item-text-current js-about-content-item-text-current':
                                                    i === activeI,
                                                'about-content-item-text-next js-about-content-item-text-next':
                                                    i === activeI + 1,
                                            })}
                                        >
                                            <div
                                                className="about-content-item__text js-about-content-item__text-current"
                                                dangerouslySetInnerHTML={{ __html: obj.content }}
                                            ></div>
                                            {obj.proposeTesting && (
                                                <div className="about-content-bottom">
                                                    <Link href="/testing" passHref>
                                                        <IconButton
                                                            as="a"
                                                            direction="vertical"
                                                            icon={<span className="icon-square"></span>}
                                                            className="about-content-bottom__link"
                                                        >
                                                            Take the test
                                                        </IconButton>
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ) : null,
                            )}
                        </div>
                        {/* {activeI > 0 && (
                            <BottomNav
                                leftSlot={
                                    <IconButton
                                        icon={<ArrLeftIcon style={{ position: 'relative', top: 1, left: -1 }} />}
                                        iconPosition="right"
                                        onClick={navigateBack}
                                    >
                                        Back
                                    </IconButton>
                                }
                                className="about-bottom-nav"
                            />
                        )} */}
                    </div>
                )}
            </DefaultLayout>
        </PageContextProvider>
    );
};

type AboutPageServerSideProps = {
    //
};

export const getServerSideProps: GetServerSideProps<AboutPageServerSideProps> = async () => {
    return {
        props: {
            bodyClass: 'about-page',
        },
    };
};

export default AboutPage;
