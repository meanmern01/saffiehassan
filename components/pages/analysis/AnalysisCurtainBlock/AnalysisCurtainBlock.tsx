import styles from './AnalysisCurtainBlock.module.scss';
import { HTMLAttributes, ReactNode, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useRecoilValue } from 'recoil';
import { preloaderReadyState } from '@/atoms/preloader-ready';
import useIsomorphicLayoutEffect from '@/hooks/use-isomorphic-layout-effect';

type Props = HTMLAttributes<HTMLElement> & {
    bottomSlot?: ReactNode;
    bottomSlotFullWidth?: boolean;
    title?: string;
    revealed?: boolean;
};

const AnalysisCurtainBlock = ({
    children,
    title,
    bottomSlot,
    bottomSlotFullWidth = false,
    revealed = false,
    ...props
}: Props) => {
    const preloaderReady = useRecoilValue(preloaderReadyState);
    // const [revealed, setRevealed] = useState(preloaderReady && revealed);

    // useIsomorphicLayoutEffect(() => {
    //     setRevealed(preloaderReady);
    // }, [preloaderReady]);

    return (
        <div
            {...props}
            className={classNames(
                'curtain-reveal-element js-curtain-reveal-element',
                styles.container,
                props.className,
                { 'is-revealed': preloaderReady && revealed },
            )}
        >
            {title && <div className={classNames('subhead analysis-curtain-block__title', styles.title)}>{title}</div>}
            {children && (
                <div className={classNames('analysis-curtain-block__content', styles.content)}>{children}</div>
            )}
            {bottomSlot && (
                <div
                    className={classNames('analysis-curtain-block__bottom-slot', styles.slot, {
                        [styles['slot--fullwidth']]: bottomSlotFullWidth,
                    })}
                >
                    {bottomSlot}
                </div>
            )}
        </div>
    );
};

export default AnalysisCurtainBlock;
