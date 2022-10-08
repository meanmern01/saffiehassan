import { useEffect } from 'react';
import { useRouter } from 'next/router';

export const EXIT_DURATION = 2;

export const usePageTransitionFix = () => {
    // console.debug(
    //     'WARNING: Still using FOUC temp fix on route change.  Has the Next.js bug not been fixed?  See https://github.com/vercel/next.js/issues/17464 ',
    // );

    const router = useRouter();

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        const routeChange = () => {
            const tempFix = () => {
                clearTimeout(timeout);
                // const elements = document.querySelectorAll('style[media="x"]');
                const elements = document.querySelectorAll('link[rel="stylesheet"][data-n-p]');
                // elements.forEach((elem) => elem.removeAttribute('media'));
                elements.forEach((elem) => elem.removeAttribute('data-n-p'));
                timeout = setTimeout(() => {
                    elements.forEach((elem) => elem.remove());
                }, EXIT_DURATION * 1000);
            };
            tempFix();
        };

        router.events.on('routeChangeComplete', routeChange);
        router.events.on('routeChangeStart', routeChange);

        return () => {
            router.events.off('routeChangeComplete', routeChange);
            router.events.off('routeChangeStart', routeChange);
        };
    }, [router.events]);

    // useEffect(() => {
    //     router.push(router.asPath);
    //     // ? Use replace() instead of push()?
    // }, [router]);
};
