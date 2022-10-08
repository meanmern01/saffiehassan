import styles from './Header.module.scss';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useRecoilValue } from 'recoil';
import { preloaderReadyState } from '@/atoms/preloader-ready';
import { currentSectionState } from '@/atoms/current-section';
import Button from '@/components/shared/Button';
import Link from '@/components/shared/Link';
import useIsomorphicLayoutEffect from '@/hooks/use-isomorphic-layout-effect';

const Header = () => {
    const logoEl = useRef<HTMLAnchorElement>(null);
    const navEl = useRef<HTMLDivElement>(null);
    const preloaderReady = useRecoilValue(preloaderReadyState);
    const currentSection = useRecoilValue(currentSectionState);
    // const [renderedCurrentSection, setRenderedCurrentSection] = useState(currentSection);

    useEffect(() => {
        const tl = gsap.timeline({ paused: true, defaults: { duration: 1, ease: 'power3.out' } });

        tl.to(navEl.current, {
            clipPath: 'inset(0% 50% 0% 50%)',
            overwrite: true,
            onComplete: () => {
                // setRenderedCurrentSection(currentSection);
            },
        }).to(navEl.current, {
            clipPath: 'inset(0% 0% 0% 0%)',
            overwrite: true,
        });

        tl.restart();
    }, [currentSection]);

    // Intro animation
    useIsomorphicLayoutEffect(() => {
        let play: (() => void) | null;
        const tl = gsap.timeline({ paused: true, defaults: { duration: 1, ease: 'power3.out' } });

        tl.fromTo(
            [logoEl.current, navEl.current],
            { clipPath: 'inset(0% 50% 0% 50%)' },
            { clipPath: 'inset(0% 0% 0% 0%)' },
        ).fromTo('.js-header-btn', { yPercent: 100 }, { yPercent: 0 }, 0.1);

        play = () => {
            tl.restart();
        };

        if (preloaderReady) {
            // document.addEventListener('new-page-ready', play);
            play();
        }

        // return () => {
        //     if (play) {
        //         document.removeEventListener('new-page-ready', play);
        //         play = null;
        //     }
        // };
    }, [preloaderReady]);

    return (
        <header className={classNames('header wrapper js-header', styles.header)}>
            <div className={styles.left}>
                <Link href="/">
                    <a ref={logoEl} className={classNames('text-button', styles.logo)}>
                        Skinstric
                    </a>
                </Link>
                <div ref={navEl} className={classNames('text-button', styles.nav)}>
                    {currentSection}
                    {/* {renderedCurrentSection} */}
                </div>
            </div>
            <div className={styles.right}>
                <div className="text-transition-container">
                    <Button variant="dark" className="js-header-btn">
                        Enter code
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Header;
