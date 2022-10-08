import styles from './Diagram.module.scss';
import gsap from 'gsap';
import classNames from 'classnames';
import { HTMLAttributes, useRef } from 'react';
import useIsomorphicLayoutEffect from '@/hooks/use-isomorphic-layout-effect';

type Props = HTMLAttributes<HTMLElement> & {
    percent: number;
};

const Diagram = ({ percent, ...props }: Props) => {
    const progressCircle = useRef<SVGCircleElement>(null);

    useIsomorphicLayoutEffect(() => {
        let tween: gsap.core.Tween | null;

        if (progressCircle.current) {
            try {
                const pathLength = progressCircle.current.getTotalLength();
                gsap.set(progressCircle.current, { strokeDasharray: pathLength });
                tween = gsap.fromTo(
                    progressCircle.current,
                    { strokeDashoffset: pathLength },
                    { duration: Math.max(0.2, percent / 100), strokeDashoffset: (pathLength / 100) * (100 - percent) },
                );
            } catch (err) {}
        }

        return () => {
            tween?.kill();
        };
    }, [percent]);

    return (
        <div {...props} className={classNames(styles.diagram, props.className)}>
            <svg
                width="100"
                height="100"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={styles['diagram-svg']}
            >
                <circle cx="50" cy="50" r="50" strokeWidth="0.8" className={classNames(styles['diagram-path'])} />
                <circle
                    ref={progressCircle}
                    cx="50"
                    cy="50"
                    r="50"
                    strokeWidth="0.8"
                    className={classNames(styles['diagram-progress'])}
                />
            </svg>
            <div className={styles.percent}>
                {percent}
                <span className={styles['percent-sign']}>%</span>
            </div>
        </div>
    );
};

export default Diagram;
