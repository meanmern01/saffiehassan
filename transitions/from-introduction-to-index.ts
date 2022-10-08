import gsap from 'gsap';
import { IPageTransition } from '@/types';
import { viewport } from '@/viewport';

const transition: IPageTransition = {
    from: '/introduction',
    to: '/',

    leave(mediaQueryDevice, fn) {
        fn?.();

        const tl = gsap.timeline({
            defaults: { duration: 1, ease: 'power3.out' },
        });

        tl.to('.js-introduction-title', { yPercent: 100 })
            .to(['.js-introduction-form', '.js-introduction-form-label'], { clipPath: 'inset(0% 50% 0% 50%)' }, 0)
            .to(['.js-introduction-left-bottom-link', '.js-introduction-right-bottom-link'], { opacity: 0, x: 20 }, 0)
            .to('.js-introduction-square', { x: viewport.width / 2 })
            .to('.js-introduction-square', { opacity: 0, duration: 0.3 }, '-=0.7');

        return tl;
    },
};

export default transition;
