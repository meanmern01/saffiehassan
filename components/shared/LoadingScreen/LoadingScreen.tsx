import styles from './LoadingScreen.module.scss';
import gsap from 'gsap';
import classNames from 'classnames';
import DottedSquare from '../DottedSquare';
import useIsomorphicLayoutEffect from '@/hooks/use-isomorphic-layout-effect';
import { useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { usePrevious } from '@/hooks/use-previous';

type Props = {
    /**
     * Text message
     */
    text: string;
    /**
     * Whether the element is visible
     * (it controls the `CSSTransition` under the hood)
     */
    visible: boolean;
};

const LoadingScreen = ({ visible, text }: Props) => {
    const textEl = useRef<HTMLDivElement>(null);
    const squareEl = useRef<HTMLDivElement>(null);
    const prevVisible = usePrevious(visible);
    const leaveDuration = 800;

    // Intro animation
    useIsomorphicLayoutEffect(() => {
        const tl = gsap.timeline({
            paused: true,
            defaults: { duration: 1, ease: 'power3.out' },
            onComplete: () => {
                tl.kill();
            },
        });
        tl.fromTo(textEl.current, { clipPath: 'inset(0% 50% 0% 50%)' }, { clipPath: 'inset(0% 0% 0% 0%)' }).fromTo(
            squareEl.current,
            { opacity: 0 },
            { opacity: 1 },
            0,
        );
        if (visible) {
            tl.play();
        }
    }, [visible]);

    // Outro animation
    useEffect(() => {
        const tl = gsap.timeline({
            paused: true,
            defaults: { duration: leaveDuration / 1000, ease: 'power3.out' },
            onComplete: () => {
                tl.kill();
            },
        });
        tl.fromTo(textEl.current, { clipPath: 'inset(0% 0% 0% 0%)' }, { clipPath: 'inset(0% 50% 0% 50%)' });

        if (prevVisible && !visible) {
            tl.play();
        }
    }, [prevVisible, visible]);

    return (
        <CSSTransition in={visible} mountOnEnter unmountOnExit timeout={leaveDuration} classNames="loading-screen">
            <div className={styles.screen}>
                <div ref={squareEl} className={styles['square-wrapper']}>
                    <DottedSquare expanded animated className={styles.square} />
                </div>
                <div ref={textEl} className={classNames('subhead', styles.text)}>
                    {text}
                </div>
            </div>
        </CSSTransition>
    );
};

export default LoadingScreen;
