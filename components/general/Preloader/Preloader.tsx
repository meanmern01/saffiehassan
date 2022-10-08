import styles from './Preloader.module.scss';
import { useEffect, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import classNames from 'classnames';
import { preloaderReadyState } from '@/atoms/preloader-ready';
import useIsomorphicLayoutEffect from '@/hooks/use-isomorphic-layout-effect';
import DottedSquare from '@/components/shared/DottedSquare';

const Preloader = () => {
    const [transitionEnded, setTransitionEnded] = useState(process.env.NODE_ENV === 'development');
    const [animated, setAnimated] = useState(false);
    const [hidden, setHidden] = useState(false);
    const elRef = useRef<HTMLDivElement>(null);
    const setPreloaderReady = useSetRecoilState(preloaderReadyState);

    useIsomorphicLayoutEffect(() => {
        document.documentElement.classList.add('no-scroll');
    }, []);

    useEffect(() => {
        setAnimated(true);
    }, []);

    useEffect(() => {
        if (transitionEnded) {
            setTimeout(() => {
                setHidden(true);
                setPreloaderReady(true);
                document.documentElement.classList.remove('no-scroll');
            }, 1000);
        }
    }, [transitionEnded, setPreloaderReady]);

    return (
        <div
            ref={elRef}
            className={classNames(styles.container, { [styles['is-animated']]: animated })}
            hidden={hidden}
        >
            <DottedSquare
                expanded
                className={styles.square}
                onTransitionEnd={() => {
                    setTransitionEnded(true);
                }}
            />

            <div
                className={classNames(styles['square-mask'], styles['square-mask-1'], {
                    [styles['is-animated']]: animated,
                })}
            >
                <div className={styles['square-mask-inner']}></div>
            </div>

            <div
                className={classNames(styles['square-mask'], styles['square-mask-2'], {
                    [styles['is-animated']]: animated,
                })}
            >
                <div className={styles['square-mask-inner']}></div>
            </div>

            <div className={classNames(styles['square-mask'], styles['square-mask-3'])}>
                <div className={styles['square-mask-inner']}></div>
            </div>
        </div>
    );
};

export default Preloader;
