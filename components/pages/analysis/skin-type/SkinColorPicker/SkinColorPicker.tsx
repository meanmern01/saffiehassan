import styles from './SkinColorPicker.module.scss';
import { HTMLAttributes, useState } from 'react';
import classNames from 'classnames';
import Tooltip from '@/components/shared/Tooltip';

export interface Props extends HTMLAttributes<HTMLElement> {
    data: {
        name: string;
        description: string;
        color: string;
        selected: boolean;
    }[];
    onPick?: (obj: any) => void;
}

const SkinColorPicker = ({ data = [], onPick, ...props }: Props) => {
    const [focusedIndex, setFocusedIndex] = useState(-1);

    return (
        <div {...props} className={classNames(styles.container, props.className)}>
            <div className={classNames('js-skin-color-picker__chosen', styles.chosen)}>
                <div className={styles['chosen-text']}>{data.find((el) => el.selected)?.name}</div>
            </div>
            {data.map((el, i) => (
                <div
                    key={i}
                    className={classNames('js-skin-color-picker__button', styles['button-wrapper'])}
                    style={{ zIndex: focusedIndex === i ? 3 : '' }}
                >
                    <Tooltip
                        label={
                            <div>
                                <div className={classNames('h4', styles['tooltip-top'])}>{el.name}</div>
                                <div className={styles['tooltip-content']}>{el.description}</div>
                            </div>
                        }
                    >
                        <button
                            className={classNames(styles.button, {
                                [styles.active]: i === data.findIndex((el) => el.selected),
                            })}
                            onClick={() => onPick?.(el)}
                            onMouseEnter={() => setFocusedIndex(i)}
                            onFocus={() => setFocusedIndex(i)}
                        >
                            <span className={styles.el} style={{ backgroundColor: el.color }}></span>
                        </button>
                    </Tooltip>
                </div>
            ))}
        </div>
    );
};

export default SkinColorPicker;
