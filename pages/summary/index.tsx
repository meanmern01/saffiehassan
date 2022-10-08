import classNames from 'classnames';
import gsap from 'gsap';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import { preloaderReadyState } from '@/atoms/preloader-ready';
import DefaultLayout from '@/components/layout/DefaultLayout';
import useIsomorphicLayoutEffect from '@/hooks/use-isomorphic-layout-effect';
import { PageContextProvider } from '@/contexts/page';
import { useOutroAnimation } from '@/hooks/use-outro-animation';
import LoadingScreen from '@/components/shared/LoadingScreen/LoadingScreen';
import BottomNav from '@/components/shared/BottomNav/BottomNav';
import IconButton from '@/components/shared/IconButton';
import ArrLeftIcon from '@/svg/arr-left.svg';
import ArrRightIcon from '@/svg/arr-right.svg';
import HeaderPadding from '@/components/layout/HeaderPadding';
import Summary from '@/components/pages/summary/Summary';

const SummaryPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const preloaderReady = useRecoilValue(preloaderReadyState);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const navigateBack = () => {
        router.push('/analysis');
    };

    const proceed = () => {
        router.push('/formula');
    };

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
        tl.fromTo('.js-summary-title', { yPercent: 100 }, { yPercent: 0 })
            .fromTo('.js-summary-description', { yPercent: 100 }, { yPercent: 0 }, 0)
            .fromTo('.js-summary-main-suggestions-tip__main', { yPercent: 100 }, { yPercent: 0 }, 0.4)
            .fromTo('.js-summary-main-suggestions-tip__secondary', { yPercent: 100 }, { yPercent: 0 }, 0.4)
            .fromTo('.js-picker__button-container', { scale: 0 }, { scale: 1, stagger: 0.1 }, 0.2)
            .fromTo('.js-summary-left-bottom-link', { opacity: 0, x: 20 }, { opacity: 1, x: 0 }, 0)
            .fromTo('.js-summary-right-bottom-link', { opacity: 0, x: -20 }, { opacity: 1, x: 0 }, 0);

        if (preloaderReady && !loading) {
            tl.play();
        }
    }, [preloaderReady, loading]);

    useOutroAnimation();

    return (
        <PageContextProvider value={props}>
            <DefaultLayout currentSection="Analysis" className={classNames('wrapper')}>
                <LoadingScreen visible={loading} text="Preparing your summary..." />
                <HeaderPadding />
                <Summary />
                <BottomNav
                    leftSlot={
                        <IconButton
                            className="js-analysis-left-bottom-link"
                            icon={<ArrLeftIcon style={{ position: 'relative', top: 1, left: -1 }} />}
                            onClick={navigateBack}
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
                            Get formula
                        </IconButton>
                    }
                />
            </DefaultLayout>
        </PageContextProvider>
    );
};

type SummaryPageServerSideProps = {
    //
};

export const getServerSideProps: GetServerSideProps<SummaryPageServerSideProps> = async () => {
    return {
        props: {
            bodyClass: 'summary-page',
        },
    };
};

export default SummaryPage;
