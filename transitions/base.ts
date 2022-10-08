import { IPageTransition } from '@/types';
import gsap from 'gsap';

const transition: IPageTransition = {
    leave(mediaQueryDevice, fn) {
        fn?.();

        const tl = gsap.timeline({
            defaults: { duration: 1, ease: 'power3.out' },
        });

        return tl;
    },
};

export default transition;
