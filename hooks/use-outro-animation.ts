import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { useTransitionContext } from '@/contexts/page-transition';
import { transitions } from '@/transitions';
import { mediaQueryDeviceState } from '@/atoms/media-query-device';

export function useOutroAnimation(fn?: () => void) {
    const router = useRouter();
    const mediaQueryDevice = useRecoilValue(mediaQueryDeviceState);
    const { timeline } = useTransitionContext();

    useEffect(() => {
        const onRouteChangeStart = (to: string) => {
            const from = router.pathname;
            const transition =
                transitions.find((transition) => transition.from === from && transition.to === to) ||
                transitions.find((transition) => transition.to === to && !transition.from) ||
                transitions.find((transition) => transition.from === from && !transition.to) ||
                transitions.find((transition) => !transition.from && !transition.to);

            if (transition) {
                timeline.add(transition.leave(mediaQueryDevice, fn), 0);
            }
        };

        router.events.on('routeChangeStart', onRouteChangeStart);

        return () => {
            router.events.off('routeChangeStart', onRouteChangeStart);
        };
    }, [router.events, timeline, router.pathname, mediaQueryDevice, fn]);
}
