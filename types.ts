// import type { Swiper } from 'swiper';

// export type SwiperHTMLElement = HTMLDivElement & {
//     swiper: Swiper;
// };

export interface IPageTransition {
    from?: string;
    to?: string;
    leave: (
        mediaQueryDevice: 'horizontal-mobile' | 'vertical-mobile' | 'horizontal-tablet' | 'vertical-tablet' | 'desktop',
        fn?: () => void,
    ) => gsap.core.Timeline;
}
