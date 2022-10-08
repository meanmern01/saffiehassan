import { atom } from 'recoil';

export const preloaderReadyState = atom({
    key: 'preloaderReadyState',
    default: false,
});
