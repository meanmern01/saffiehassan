import '../css/base/_fonts.scss';
import '../css/app.scss';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import { initPolyfills } from '@/polyfills';
import { initializeRecoilState } from '@/atoms';
import { calculateScrollbarWidth } from '@/utils/calculate-scrollbar-width';
import LayoutGrid from '@/components/layout/LayoutGrid/LayoutGrid.client';
import Preloader from '@/components/general/Preloader/Preloader';
import { NotificationsContextProvider } from '@/contexts/notifications';
import Header from '@/components/layout/Header';
import Notifications from '@/components/general/Notifications';
import { TransitionProvider } from '@/contexts/page-transition';
import TransitionLayout from '@/components/layout/TransitionLayout';
import useIsomorphicLayoutEffect from '@/hooks/use-isomorphic-layout-effect';
import { usePageTransitionFix } from '@/hooks/use-page-transition-fix';
import CookiesAgreement from '@/components/general/CookiesAgreement';
import RouteGuard from '@/components/guards/AuthGuard';
import vhMobileFix from '@/utils/vh-mobile-fix';

if (typeof window !== 'undefined') {
    gsap.config({ nullTargetWarn: false });
}

function MyApp({ Component, pageProps }: AppProps) {
    // ? Temp fix for FOUC on route change...  :(
    usePageTransitionFix();

    const router = useRouter();

    useIsomorphicLayoutEffect(() => {
        if (typeof window !== 'undefined') {
            document.documentElement.classList.add('js-ready');
            initPolyfills();
            vhMobileFix();
            calculateScrollbarWidth();
            gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
        }
    }, []);

    return (
        <RecoilRoot initializeState={initializeRecoilState(pageProps.appData?.initialRecoilState || {})}>
            <NotificationsContextProvider>
                <TransitionProvider>
                    <TransitionLayout>
                        <Preloader />
                        <Header />
                        <main className="main">
                            {/* <RouteGuard> */}
                            <Component {...pageProps} key={router.asPath} />
                            {/* </RouteGuard> */}
                        </main>
                        <Notifications />
                        <CookiesAgreement />
                        <LayoutGrid />
                    </TransitionLayout>
                </TransitionProvider>
            </NotificationsContextProvider>
        </RecoilRoot>
    );
}

export default MyApp;
