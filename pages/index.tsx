import { useCallback, useEffect, useRef, useState } from 'react';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import classNames from 'classnames';
import gsap from 'gsap';
import DefaultLayout from '@/components/layout/DefaultLayout';
import TriangleLink from '@/components/pages/index/TriangleLink';
import useIsomorphicLayoutEffect from '@/hooks/use-isomorphic-layout-effect';
import { preloaderReadyState } from '@/atoms/preloader-ready';
import { getCSSCustomProp } from '@/utils/css';
import IconButton from '@/components/shared/IconButton';
import ArrLeftIcon from '@/svg/arr-left.svg';
import ArrRightIcon from '@/svg/arr-right.svg';
import { PageContextProvider } from '@/contexts/page';
import { useOutroAnimation } from '@/hooks/use-outro-animation';
import { viewport } from '@/viewport';
import { mediaQueryDeviceState } from '@/atoms/media-query-device';
import { touchState } from '@/atoms/touch';

const HomePage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const leftTriangleLink = useRef<HTMLDivElement>(null);
    const rightTriangleLink = useRef<HTMLDivElement>(null);
    const titleEl = useRef<HTMLDivElement>(null);
    const titleContainerEl = useRef<HTMLDivElement>(null);
    const titleWrapperEl = useRef<HTMLDivElement>(null);
    const textEl = useRef<HTMLDivElement>(null);
    const [titleWords, setTitleWords] = useState<Element[]>([]);
    const [enteredExperience, setEnteredExperience] = useState(false);
    const preloaderReady = useRecoilValue(preloaderReadyState);
    const [isPageLeaving, setIsPageLeaving] = useState(false);
    const router = useRouter();
    const mediaQueryDevice = useRecoilValue(mediaQueryDeviceState);
    const isTouchDevice = useRecoilValue(touchState);

    const translateTitle = useCallback(
        (direction: 'left' | 'right') => {
            if (titleWords[0] && titleContainerEl.current && titleWrapperEl.current) {
                const offsetX = getCSSCustomProp(document.documentElement, '--offset-x', 'number') as number;
                const rect = titleWords[0].getBoundingClientRect();
                const firstWordOffsetLeft = (viewport.width - rect.width) / 2;
                gsap.to(titleWrapperEl.current, {
                    duration: 1,
                    ease: 'power3.out',
                    x: isTouchDevice ? 0 : Math.sign(direction === 'left' ? -1 : 1) * (firstWordOffsetLeft - offsetX),
                    overwrite: true,
                });
            }
        },
        [titleWords, isTouchDevice],
    );

    const translateLastWord = useCallback(
        (direction: 'left' | 'right') => {
            if (titleWords[0] && titleWords[1]) {
                const word1Rect = titleWords[0].getBoundingClientRect();
                const word2Rect = titleWords[1].getBoundingClientRect();
                gsap.to(titleWords[1], {
                    duration: 1,
                    ease: 'power3.out',
                    x: isTouchDevice
                        ? 0
                        : (Math.sign(direction === 'left' ? -1 : 1) * (word1Rect.width - word2Rect.width)) / 2,
                    overwrite: true,
                });
            }
        },
        [titleWords, isTouchDevice],
    );

    const translateTitleAndLastWord = useCallback(
        (direction: 'left' | 'right', instant = false) => {
            translateTitle(direction);
            translateLastWord(direction);

            const triangleLink = direction === 'left' ? leftTriangleLink.current : rightTriangleLink.current;
            gsap.to(triangleLink, {
                duration: instant ? 0 : 1,
                ease: 'power3.out',
                x: `${Math.sign(direction === 'left' ? -1 : 1) * (mediaQueryDevice === 'desktop' ? 50 : 60)}vw`,
                overwrite: true,
            });
        },
        [translateLastWord, translateTitle, mediaQueryDevice],
    );

    function restoreTitleAndLastWordPosition() {
        if (!isPageLeaving) {
            gsap.to(titleWrapperEl.current, { duration: 1, ease: 'power3.out', x: 0 });
            gsap.to(titleWords[1], { duration: 1, ease: 'power3.out', x: 0 });
            gsap.to([leftTriangleLink.current, rightTriangleLink.current], { duration: 1, ease: 'power3.out', x: 0 });
        }
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            import('gsap/SplitText').then(({ SplitText }) => {
                const splitted = new SplitText(titleEl.current, { type: 'words', tag: 'span' });
                splitted.words.forEach((el) => el.classList.add('splitted'));
                setTitleWords(splitted.words);
            });
        }
    }, []);

    // Intro animation
    useIsomorphicLayoutEffect(() => {
        const tl = gsap.timeline({
            paused: true,
            defaults: { duration: 1, ease: 'power3.out' },
            onComplete: () => {
                tl.kill();
            },
        });
        tl.fromTo([titleEl.current, textEl.current], { yPercent: 100 }, { yPercent: 0 })
            .fromTo('.js-index-dotted-square-el', { opacity: 0 }, { opacity: 1 }, 0.15)
            .fromTo('.index-left-link .js-index-dotted-square__item', { opacity: 0, x: 15 }, { opacity: 1, x: 0 }, 0.25)
            .fromTo(
                '.index-right-link .js-index-dotted-square__item',
                { opacity: 0, x: -15 },
                { opacity: 1, x: 0 },
                0.25,
            );

        if (preloaderReady) {
            tl.play();
        }
    }, [preloaderReady]);

    useOutroAnimation();

    useEffect(() => {
        const onRouteChangeStart = (to: string) => {
            setIsPageLeaving(true);

            if (to === '/introduction') {
                translateTitleAndLastWord('left', mediaQueryDevice === 'desktop');
            }
        };

        router.events.on('routeChangeStart', onRouteChangeStart);

        return () => {
            router.events.off('routeChangeStart', onRouteChangeStart);
        };
    }, [router.events, translateTitleAndLastWord, mediaQueryDevice]);

    return (
        <PageContextProvider value={props}>
            <DefaultLayout
                currentSection="Intro"
                className={classNames('wrapper', {
                    'has-entered-experience': enteredExperience,
                    'is-page-leaving': isPageLeaving,
                })}
            >
                <div className="index-content">
                    <div ref={titleContainerEl} className="index-title-container">
                        <div ref={titleWrapperEl} className="index-title-wrapper text-transition-container">
                            <h1 ref={titleEl} className="index-title js-index-title">
                                Sophisticated skincare
                            </h1>
                        </div>
                    </div>

                    <div className="text-caption index-description text-transition-container">
                        <p ref={textEl} className="js-index-description">
                            Skinstric developed an A.I. that creates a highly-personalised routine tailored to what your
                            skin needs.
                        </p>
                    </div>

                    <div className="index-enter-exp-btn">
                        <IconButton
                            icon={<ArrRightIcon />}
                            iconPosition="right"
                            onClick={() => setEnteredExperience(true)}
                        >
                            Enter experience
                        </IconButton>
                    </div>
                </div>

                <TriangleLink
                    ref={leftTriangleLink}
                    link
                    href="/about"
                    icon={<ArrLeftIcon />}
                    text="Discover A.I."
                    className="index-left-link"
                    onLinkMouseenter={() => translateTitleAndLastWord('right')}
                    onLinkMouseleave={restoreTitleAndLastWordPosition}
                />
                <TriangleLink
                    ref={rightTriangleLink}
                    iconPosition="right"
                    link
                    href="/testing"
                    icon={<ArrRightIcon />}
                    text="Take test"
                    className="index-right-link"
                    onLinkMouseenter={() => translateTitleAndLastWord('left')}
                    onLinkMouseleave={restoreTitleAndLastWordPosition}
                />
            </DefaultLayout>
        </PageContextProvider>
    );
};

type IndexPageServerSideProps = {
    //
};

export const getServerSideProps: GetServerSideProps<IndexPageServerSideProps> = async () => {
    return {
        props: {
            bodyClass: 'index-page',
        },
    };
};

export default HomePage;
