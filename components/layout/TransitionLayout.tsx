/**
 * Used to check whether page leave animation has been completed
 * in order to render the content of the new page.
 */

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { usePrevious } from '@/hooks/use-previous';
import useIsomorphicLayoutEffect from '@/hooks/use-isomorphic-layout-effect';
import { useTransitionContext } from '@/contexts/page-transition';
import { useSetRecoilState } from 'recoil';
import { prevRouteState } from '@/atoms/prev-route';

export default function TransitionLayout({ children }: { children: ReactNode }) {
    const router = useRouter();
    const prevRoute = usePrevious(router.route);
    const [displayChildren, setDisplayChildren] = useState<ReactNode>(children);
    const { timeline } = useTransitionContext();
    const [isPopState, setIsPopState] = useState(false);
    const setPrevRouteState = useSetRecoilState(prevRouteState);

    const setChildren = () => {
        if (!isPopState) {
            window.scrollTo({ top: 0, behavior: 'auto' });
        }

        setDisplayChildren(children);
        setIsPopState(false);
        setPrevRouteState(router.route);

        setTimeout(() => {
            document.dispatchEvent(new Event('new-page-ready'));
        }, 1);
    };

    useEffect(() => {
        router.beforePopState((state) => {
            state.options.scroll = false;
            setIsPopState(true);
            return true;
        });
    }, [router]);

    useIsomorphicLayoutEffect(() => {
        if (router.route !== prevRoute) {
            if (timeline.duration() === 0) {
                // there are no outro animations, so immediately transition
                setChildren();
            } else {
                timeline.play().then(() => {
                    // outro complete so reset to an empty paused timeline
                    timeline.pause().clear();
                    setChildren();
                });
            }
        }
    }, [children]);

    return <>{displayChildren}</>;
}
