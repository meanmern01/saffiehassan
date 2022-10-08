import classNames from 'classnames';
import gsap from 'gsap';
import { useRecoilValue } from 'recoil';
import { preloaderReadyState } from '@/atoms/preloader-ready';
import DefaultLayout from '@/components/layout/DefaultLayout';
import useIsomorphicLayoutEffect from '@/hooks/use-isomorphic-layout-effect';
import { PageContextProvider } from '@/contexts/page';
import { useOutroAnimation } from '@/hooks/use-outro-animation';
import Link from '@/components/shared/Link';
import BottomNav from '@/components/shared/BottomNav/BottomNav';
import IconButton from '@/components/shared/IconButton';
import ArrLeftIcon from '@/svg/arr-left.svg';
import HeaderPadding from '@/components/layout/HeaderPadding';

const DemographicsInnerLayout = ({
    title,
    description,
    bottomNavMiddleSlot,
    bottomNavRightSlot,
    children,
    ...props
}: any) => {
    const preloaderReady = useRecoilValue(preloaderReadyState);

    const renderBackButton = () => (
        <div className="analysis-inner-back-btn-wrapper analysis-inner-clip-wrapper js-analysis-inner-clip-wrapper">
            <Link href="/analysis">
                <IconButton
                    as="a"
                    className="js-analysis-inner-clip"
                    icon={<ArrLeftIcon style={{ position: 'relative', top: 1, left: -1 }} />}
                >
                    Back
                </IconButton>
            </Link>
        </div>
    );

    // Intro animation
    useIsomorphicLayoutEffect(() => {
        const tl = gsap.timeline({
            paused: true,
            defaults: { duration: 1, ease: 'power3.out' },
            onComplete: () => {
                tl.kill();
            },
        });
        tl.fromTo('.js-analysis-inner-clip-wrapper', { xPercent: -100 }, { xPercent: 0 }).fromTo(
            '.js-analysis-inner-clip',
            { xPercent: 100 },
            { xPercent: 0 },
            0,
        );

        if (preloaderReady) {
            tl.play();

            Array.from(document.querySelectorAll('.js-curtain-reveal-element')).forEach((el) => {
                el.classList.add('is-revealed');
            });
        }
    }, [preloaderReady]);

    useOutroAnimation();

    return (
        <PageContextProvider value={props}>
            <DefaultLayout currentSection="Analysis" className={classNames('wrapper', props.className)}>
                <HeaderPadding />

                <div className="analysis-inner-top">
                    <div className="analysis-inner-top__back-btn-wrapper">{renderBackButton()}</div>
                    <div className="text-transition-container analysis-inner-clip-wrapper js-analysis-inner-clip-wrapper">
                        <div className="introduction-title js-analysis-inner-clip">A. I. Analysis</div>
                    </div>
                    <div className="text-transition-container analysis-inner-clip-wrapper js-analysis-inner-clip-wrapper">
                        <h1 className="h2 text-uppercase analysis-inner-title js-analysis-inner-clip">{title}</h1>
                    </div>
                    {description && (
                        <div className="text-transition-container analysis-inner-clip-wrapper js-analysis-inner-clip-wrapper">
                            <p className="text-caption introduction-description js-analysis-inner-clip">
                                {description}
                            </p>
                        </div>
                    )}
                </div>

                <div className="analysis-inner-content">{children}</div>

                <BottomNav
                    fixed
                    leftSlot={renderBackButton()}
                    middleSlot={bottomNavMiddleSlot}
                    rightSlot={bottomNavRightSlot}
                    className="analysis-inner-bottom-nav"
                />
            </DefaultLayout>
        </PageContextProvider>
    );
};

export default DemographicsInnerLayout;
