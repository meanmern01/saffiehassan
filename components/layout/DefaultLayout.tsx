import React, { useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import classnames from 'classnames';
import { useSetRecoilState } from 'recoil';
import Favicons from '@/components/layout/Favicons';
import { usePageContext } from '@/contexts/page';
import useIsomorphicLayoutEffect from '@/hooks/use-isomorphic-layout-effect';
import { mediaQueryDeviceState } from '@/atoms/media-query-device';
import { touchState } from '@/atoms/touch';
import { currentSectionState } from '@/atoms/current-section';

interface Props extends React.HTMLAttributes<HTMLElement> {
    currentSection?: string;
}

const DefaultLayout: NextPage<Props> = ({ children, currentSection, ...props }) => {
    const { bodyClass } = usePageContext();
    const setMediaQueryDeviceState = useSetRecoilState(mediaQueryDeviceState);
    const setTouchState = useSetRecoilState(touchState);
    const setCurrentSection = useSetRecoilState(currentSectionState);

    useIsomorphicLayoutEffect(() => {
        const setDevice = () => {
            switch (true) {
                case matchMedia('(max-width: 767px)').matches:
                    setMediaQueryDeviceState('vertical-mobile');
                    break;
                case matchMedia('(max-width: 900px) and (orientation: landscape)').matches:
                    setMediaQueryDeviceState('horizontal-mobile');
                    break;
                case matchMedia('(min-width: 768px) and (max-width: 1199px) and (orientation: portrait)').matches:
                    setMediaQueryDeviceState('vertical-tablet');
                    break;
                case matchMedia('(min-width: 768px) and (max-width: 1199px) and (orientation: landscape)').matches:
                    setMediaQueryDeviceState('horizontal-tablet');
                    break;
                default:
                    setMediaQueryDeviceState('desktop');
                    break;
            }
        };

        const setIsTouch = () => {
            setTouchState(matchMedia('(hover: none)').matches);
        };

        const onResize = () => {
            setDevice();
            setIsTouch();
        };

        onResize();
        window.addEventListener('resize', onResize);

        return () => window.removeEventListener('resize', setDevice);
    }, []);

    useEffect(() => {
        if (bodyClass) {
            document.body.classList.add(...bodyClass.split(' '));
        }

        return () => {
            if (bodyClass) {
                document.body.classList.remove(...bodyClass.split(' '));
            }
        };
    }, [bodyClass]);

    useEffect(() => {
        setCurrentSection(currentSection || '');
    }, [currentSection, setCurrentSection]);

    return (
        <div {...props} className={classnames('page', props.className)}>
            <Head>
                <meta charSet="utf-8" />
                <title>Skinstric</title>
                <meta name="description" content="" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Favicons />
                <meta property="og:locale" content="ru" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Skinstric" />
                <meta property="og:description" content="" />
                <meta property="og:image" content="/img/og-image.png" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:image" content="/img/og-image.png" />
                <meta name="twitter:title" content="Skinstric" />
                <meta name="twitter:description" content="" />

                {/* <link
                    rel="preload"
                    href="/fonts/Roobert-Light.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                ></link> */}
                <link
                    rel="preload"
                    href="/fonts/Roobert-Regular.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                ></link>
                <link
                    rel="preload"
                    href="/fonts/Roobert-SemiBold.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                ></link>
            </Head>

            {children}
        </div>
    );
};

export default DefaultLayout;
