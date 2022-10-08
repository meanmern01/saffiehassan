import gsap from 'gsap';
import { IPageTransition } from '@/types';
import { viewport } from '@/viewport';

const transition: IPageTransition = {
    from: '/',
    to: '/introduction',

    leave(mediaQueryDevice, fn) {
        fn?.();

        const tl = gsap.timeline({
            defaults: { duration: 1, ease: 'power3.out' },
        });
        const square = document.querySelector<HTMLElement>('.index-right-link .js-index-dotted-square-el');

        tl.to(square, {
            x: (-viewport.width + (square?.offsetWidth || 0)) / 2,
        })
            .to('.index-right-link .js-index-dotted-square__item', { duration: 0.3, opacity: 0 }, 0)
            .to(['.js-index-description', '.js-index-title'], { yPercent: 100 }, 0);

        return tl;
    },
};

export default transition;
