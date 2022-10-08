import gsap from 'gsap';
import { IPageTransition } from '@/types';

const transition: IPageTransition = {
    from: '/about',

    leave(mediaQueryDevice, fn) {
        fn?.();

        const tl = gsap.timeline({
            defaults: { duration: 1, ease: 'power3.out' },
        });

        tl.to('.js-about-container', { y: -100, opacity: 0 });

        return tl;
    },
};

export default transition;
