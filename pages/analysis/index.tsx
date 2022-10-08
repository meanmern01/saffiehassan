import classNames from 'classnames';
import gsap from 'gsap';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { useRecoilValue } from 'recoil';
import { preloaderReadyState } from '@/atoms/preloader-ready';
import DefaultLayout from '@/components/layout/DefaultLayout';
import useIsomorphicLayoutEffect from '@/hooks/use-isomorphic-layout-effect';
import { PageContextProvider } from '@/contexts/page';
import { useOutroAnimation } from '@/hooks/use-outro-animation';
import { useEffect, useState } from 'react';
import LoadingScreen from '@/components/shared/LoadingScreen/LoadingScreen';
import DottedSquare from '@/components/shared/DottedSquare';
import Link from '@/components/shared/Link';
import BottomNav from '@/components/shared/BottomNav/BottomNav';
import IconButton from '@/components/shared/IconButton';
import ArrLeftIcon from '@/svg/arr-left.svg';
import ArrRightIcon from '@/svg/arr-right.svg';
import AnalysisMessage from '@/components/pages/analysis/AnalysisMessage/AnalysisMessage';
import { useRouter } from 'next/router';

const AnalysisPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const preloaderReady = useRecoilValue(preloaderReadyState);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(
            () => {
                setLoading(false);
            },
            process.env.NODE_ENV === 'development' ? 100 : 3000,
        );

        return () => clearTimeout(timer);
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
        tl.fromTo('.js-analysis-title', { yPercent: 100 }, { yPercent: 0 })
            .fromTo('.js-analysis-description', { yPercent: 100 }, { yPercent: 0 }, 0)
            .fromTo('.js-analysis-square', { duration: 0.4, opacity: 0 }, { opacity: 1 }, 0)
            .fromTo('.js-analysis-square-action', { scale: 0 }, { scale: 1, stagger: 0.1 }, 0.2)
            .fromTo('.js-analysis-left-bottom-link', { opacity: 0, x: 20 }, { opacity: 1, x: 0 }, 0)
            .fromTo('.js-analysis-right-bottom-link', { opacity: 0, x: -20 }, { opacity: 1, x: 0 }, 0);

        if (preloaderReady && !loading) {
            tl.play();
        }
    }, [preloaderReady, loading]);

    const proceed = () => {
        router.push('/summary');
    };

    useOutroAnimation();

    const data = [
        {
            id: 1,
            name: 'Demographics',
            url: '/analysis/demographics',
        },
        {
            id: 2,
            name: 'Cosmetic concerns',
            url: '/analysis/cosmetic-concerns',
        },
        {
            id: 3,
            name: 'Weather',
            url: '/analysis/weather',
        },
        {
            id: 4,
            name: 'Skin Type Details',
            url: '/analysis/skin-type',
        },
    ];

    return (
        <PageContextProvider value={props}>
            <DefaultLayout currentSection="Analysis" className={classNames('wrapper')}>
                <LoadingScreen visible={loading} text="Preparing your analysis..." />
                <div className="introduction-title-container">
                    <div className="text-transition-container">
                        <h1 className="introduction-title js-analysis-title">A. I. Analysis</h1>
                    </div>
                    {!loading && (
                        <>
                            <div className="text-transition-container">
                                <p className="text-caption introduction-description analysis-description js-analysis-description">
                                    A. I. has estimated the following.
                                    <br />
                                    Fix estimated information if needed.
                                </p>
                            </div>
                            <div className="analysis-message">
                                <AnalysisMessage />
                            </div>
                        </>
                    )}
                </div>
                {!loading && (
                    <>
                        <div className="analysis-square-container">
                            <DottedSquare expanded className="analysis-square js-analysis-square" />
                            <div className="analysis-square-actions">
                                {data.map((obj) => (
                                    <Link key={obj.id} href={obj.url}>
                                        <a className="analysis-square-action js-analysis-square-action">
                                            <span className="subhead analysis-square-action__text">{obj.name}</span>
                                        </a>
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <BottomNav
                            fixed
                            leftSlot={
                                <IconButton
                                    className="js-analysis-left-bottom-link"
                                    icon={<ArrLeftIcon style={{ position: 'relative', top: 1, left: -1 }} />}
                                    // onClick={navigateBack}
                                >
                                    Back
                                </IconButton>
                            }
                            rightSlot={
                                <IconButton
                                    className="js-analysis-right-bottom-link"
                                    icon={<ArrRightIcon style={{ position: 'relative', top: -1, left: 1 }} />}
                                    iconPosition="right"
                                    onClick={proceed}
                                >
                                    Get summary
                                </IconButton>
                            }
                        />
                    </>
                )}
            </DefaultLayout>
        </PageContextProvider>
    );
};

type AnalysisPageServerSideProps = {
    //
};

export const getServerSideProps: GetServerSideProps<AnalysisPageServerSideProps> = async () => {
    return {
        props: {
            bodyClass: 'analysis-page',
        },
    };
};

export default AnalysisPage;
