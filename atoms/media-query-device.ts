import { atom } from 'recoil';

export const mediaQueryDeviceState = atom<
    'horizontal-mobile' | 'vertical-mobile' | 'horizontal-tablet' | 'vertical-tablet' | 'desktop'
>({
    key: 'mediaQueryDeviceState',
    default: 'desktop',
});
