import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { userState } from '@/atoms/user';

function RouteGuard({ children }: { children: JSX.Element }) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);
    const user = useRecoilValue(userState);

    function authCheck(url: string) {
        // redirect to login page if accessing a private page and not logged in
        const publicPaths = ['/'];
        const path = url.split('?')[0];
        if (!(user.name && user.origin) && !publicPaths.includes(path)) {
            setAuthorized(false);
            console.log(router);
            router.push({
                pathname: '/introduction',
                query: { returnUrl: router.asPath },
            });
        } else {
            setAuthorized(true);
        }
    }

    useEffect(() => {
        // on initial load - run auth check
        authCheck(router.asPath);

        // on route change start - hide page content by setting authorized to false
        const hideContent = () => setAuthorized(false);
        router.events.on('routeChangeStart', hideContent);

        // on route change complete - run auth check
        router.events.on('routeChangeComplete', authCheck);

        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // return authorized && children;
    return children;
}

export default RouteGuard;
