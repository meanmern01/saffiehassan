import { atom } from 'recoil';

export const prevRouteState = atom<string | undefined>({
    key: 'prevRouteState',
    default: undefined,
});
