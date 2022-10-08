import gsap from 'gsap';
import { IPageTransition } from '@/types';

const transition: IPageTransition = {
    from: '/analysis/demographics',

    leave(mediaQueryDevice, fn) {
        fn?.();

        const tl = gsap.timeline({
            defaults: { duration: 1, ease: 'power3.out' },
        });

        tl.to('.js-analysis-inner-clip-wrapper', { xPercent: -105 })
            .to('.js-analysis-inner-clip', { xPercent: 105 }, 0)
            .to({}, { duration: 0.2 });

        Array.from(document.querySelectorAll('.js-curtain-reveal-element')).forEach((el) => {
            el.classList.remove('is-revealed');
        });

        return tl;
    },
};

export default transition;
