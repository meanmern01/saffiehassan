import gsap from 'gsap';
import Link from '@/components/shared/Link';
import IconButton from '@/components/shared/IconButton';
import DottedSquare from '@/components/shared/DottedSquare';
import ArrLeftSVG from '@/svg/arr-left.svg';
import { useOutroAnimation } from '@/hooks/use-outro-animation';
import useIsomorphicLayoutEffect from '@/hooks/use-isomorphic-layout-effect';
import { useRecoilValue } from 'recoil';
import { preloaderReadyState } from '@/atoms/preloader-ready';

type Props = {
    errorNumber: number;
    errorText: string;
};

const ErrorLayout = ({ errorNumber, errorText }: Props) => {
    const preloaderReady = useRecoilValue(preloaderReadyState);

    // Intro animation
    useIsomorphicLayoutEffect(() => {
        const tl = gsap.timeline({
            paused: true,
            defaults: { duration: 1, ease: 'power3.out' },
            onComplete: () => {
                tl.kill();
            },
        });
        tl.fromTo('.js-error-page-translate-el', { yPercent: 100 }, { yPercent: 0 });

        if (preloaderReady) {
            tl.play();
        }
    }, [preloaderReady]);

    useOutroAnimation();

    return (
        <div className="error-page-layout">
            <div className="error-page-square-wrapper">
                <DottedSquare className="error-page-square" expanded />
                <div className="error-page-content">
                    <div className="text-transition-container error-page-title">
                        <h1 className="h4 js-error-page-translate-el">{errorText}</h1>
                    </div>
                    <div className="text-transition-container error-page-title-back-btn-container">
                        <Link href="/" passHref>
                            <IconButton
                                icon={<ArrLeftSVG style={{ position: 'relative', top: 1, left: -1 }} />}
                                className="js-error-page-translate-el"
                            >
                                To the main page
                            </IconButton>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorLayout;
