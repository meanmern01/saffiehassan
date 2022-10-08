import gsap from 'gsap';
import { IPageTransition } from '@/types';

const transition: IPageTransition = {
    from: '/analysis',

    leave(mediaQueryDevice, fn) {
        fn?.();

        const tl = gsap.timeline({
            defaults: { duration: 1, ease: 'power3.out' },
        });

        tl.to(['.js-analysis-title', '.js-analysis-description'], { yPercent: 100 })
            .to('.js-analysis-square', { duration: 0.5, opacity: 0 }, 0)
            .to('.js-analysis-square-action', { scale: 0, stagger: 0.1 }, 0)
            .to(['.js-analysis-left-bottom-link', '.js-analysis-right-bottom-link'], { opacity: 0 }, 0);

        return tl;
    },
};

export default transition;
