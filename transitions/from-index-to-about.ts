import gsap from 'gsap';
import { IPageTransition } from '@/types';

const transition: IPageTransition = {
    from: '/',
    to: '/about',

    leave(mediaQueryDevice, fn) {
        fn?.();

        const tl = gsap.timeline({
            defaults: { duration: 1, ease: 'power3.out' },
        });
        const square = document.querySelector<HTMLElement>('.index-left-link .js-index-dotted-square-el');

        tl.to('.index-left-link', { x: -(square?.offsetWidth || 0) }).to(
            ['.js-index-description', '.js-index-title'],
            { yPercent: 100 },
            0,
        );

        return tl;
    },
};

export default transition;
