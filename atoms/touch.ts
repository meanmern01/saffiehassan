import { atom } from 'recoil';

export const touchState = atom<boolean>({
    key: 'touchState',
    default: false,
});
