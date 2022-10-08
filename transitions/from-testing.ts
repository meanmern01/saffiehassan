import gsap from 'gsap';
import { IPageTransition } from '@/types';

const transition: IPageTransition = {
    from: '/testing',

    leave(mediaQueryDevice, fn) {
        fn?.();

        const tl = gsap.timeline({
            defaults: { duration: 1, ease: 'power3.out' },
        });

        tl.to('.js-introduction-title', { yPercent: 100 }).to(
            '.js-testing-access-btn',
            { x: 40, opacity: 0, stagger: 0.1 },
            0,
        );

        return tl;
    },
};

export default transition;
