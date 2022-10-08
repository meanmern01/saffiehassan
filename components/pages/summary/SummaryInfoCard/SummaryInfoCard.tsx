import styles from './SummaryInfoCard.module.scss';
import { forwardRef, HTMLAttributes, useEffect, useRef } from 'react';
import classNames from 'classnames';
import Button from '@/components/shared/Button';
import CrossSVG from '@/svg/cross.svg';

export interface Props extends HTMLAttributes<HTMLElement> {
    description?: string;
    name?: string;
    select?: () => void;
    deselect?: () => void;
    onClose?: () => void;
    selected?: boolean;
}

const SummaryInfoCard = forwardRef<HTMLDivElement, Props>(
    ({ name, description, selected = false, select, deselect, onClose, ...props }, ref) => {
        const contentEl = useRef<HTMLDivElement>(null);

        useEffect(() => {
            if (contentEl.current) {
                contentEl.current.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }, [name, description]);

        return (
            <div
                {...props}
                ref={ref}
                className={classNames('curtain-reveal-element js-curtain-reveal-element', props.className)}
            >
                <div ref={contentEl} className={styles.content}>
                    <div className={styles.top}>
                        {name && <div className={classNames('subhead', styles.title)}>{name}</div>}
                        <button className={styles['close-btn']} aria-label="Close" onClick={onClose}>
                            <CrossSVG />
                        </button>
                    </div>
                    {description && (
                        <div className={styles.description} dangerouslySetInnerHTML={{ __html: description }}></div>
                    )}
                    <div className={styles.bottom}>
                        <Button onClick={selected ? deselect : select}>{selected ? 'Remove' : 'Add'}</Button>
                    </div>
                </div>
            </div>
        );
    },
);

SummaryInfoCard.displayName = 'SummaryInfoCard';

export default SummaryInfoCard;
