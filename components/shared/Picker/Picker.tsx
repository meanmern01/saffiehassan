import styles from './Picker.module.scss';
import { forwardRef, HTMLAttributes, useEffect, useState } from 'react';
import classNames from 'classnames';
import Tooltip from '@/components/shared/Tooltip';
import type { PickerOption } from './types';

export type Props = HTMLAttributes<HTMLElement> & {
    /**
     * Position for placing elements.
     * - `center` the squares will be positioned around the middle one.
     * - `left`: the squares will be positioned to the left of the middle one
     * and will grow in that direction.
     * - `right`: the squares will be positioned to the right of the middle one
     * and will grow in that direction.
     */
    distribution?: 'center' | 'left' | 'right' | 'top' | 'bottom';
    /**
     * Text in the middle square
     */
    middleText?: string;
    /**
     * Options array.
     *
     * PickerOption:
     *      - name: string;
     *      - description?: string;
     *      - selected?: boolean;
     */
    options: PickerOption[];
    /**
     * Pick handler
     */
    onPick?: (obj: PickerOption) => void;
    onMiddleSquareClick?: () => void;
    renderButtonSlot?: (obj: PickerOption) => JSX.Element | null | undefined;
    renderButtonInnerSlot?: (obj: PickerOption) => JSX.Element | null | undefined;
    showTooltip?: boolean;
    /**
     * Upper text in the middle square
     */
    sup?: string;
};

const Picker = forwardRef<HTMLDivElement, Props>(
    (
        {
            options = [],
            middleText,
            showTooltip = false,
            distribution = 'center',
            sup,
            onPick,
            onMiddleSquareClick,
            renderButtonSlot,
            renderButtonInnerSlot,
            ...props
        },
        ref,
    ) => {
        const n = 3;
        const [focusedIndex, setFocusedIndex] = useState(-1);
        const [columns, setColumns] = useState(n);

        useEffect(() => {
            if (distribution === 'center') {
                setColumns(n);
            } else {
                setColumns(1 + Math.ceil(options.length / n));
            }
        }, [distribution, options.length]);

        const renderButton = (element: PickerOption, index: number) => (
            <button
                className={classNames(styles.button, { [styles.active]: !!element.selected })}
                onClick={() => onPick?.(element)}
                onMouseEnter={() => setFocusedIndex(index)}
                onFocus={() => setFocusedIndex(index)}
            >
                <span className={styles.el}>
                    <span className={classNames('subhead', styles['el-text'])}>
                        {element.name}
                        {renderButtonInnerSlot?.(element)}
                    </span>
                </span>
            </button>
        );

        const getChosenColPosition = () => {
            if (distribution === 'center') {
                return 2;
            }

            if (distribution === 'left') {
                return columns;
            }

            if (distribution === 'right') {
                return 1;
            }

            if (distribution === 'top') {
                return columns;
            }

            if (distribution === 'bottom') {
                return 1;
            }
        };

        const getChosenRowPosition = () => {
            if (distribution === 'center') {
                return 2;
            }

            if (distribution === 'left') {
                return 1;
            }

            if (distribution === 'right') {
                return columns;
            }

            if (distribution === 'top') {
                return columns;
            }

            if (distribution === 'bottom') {
                return 1;
            }
        };

        const getButtonColPosition = (index: number) => {
            if (distribution === 'left') {
                return columns - Math.floor(index / n) + (index % n === 1 ? 1 : 0) - 1;
            }

            if (distribution === 'right') {
                return 1 + Math.floor(index / n) + (index % n === 0 ? 0 : 1);
            }

            if (distribution === 'top') {
                return columns - Math.floor(index / n) - (index % n === 1 ? 0 : 1);
            }

            if (distribution === 'bottom') {
                return 1 + Math.floor(index / n) + (index % n === 0 ? 0 : 1);
            }
        };

        const getButtonRowPosition = (index: number) => {
            if (distribution === 'left') {
                return 1 + Math.floor(index / n) + (index % n === 0 ? 0 : 1);
            }

            if (distribution === 'right') {
                return columns - Math.floor(index / n) - (index % n === 1 ? 0 : 1);
            }

            if (distribution === 'top') {
                return columns - Math.floor(index / n) - (index % n === 0 ? 0 : 1);
            }

            if (distribution === 'bottom') {
                return 1 + Math.floor(index / n) + (index % n === 1 ? 0 : 1);
            }
        };

        return (
            <div
                {...props}
                ref={ref}
                className={classNames(
                    'picker-wrapper',
                    styles.wrapper,
                    props.className,
                    styles[`distribution--${distribution}`],
                )}
            >
                <div className={classNames('picker-container', styles.container)}>
                    <div className={classNames('picker', styles.picker)} style={{ '--picker-columns': columns }}>
                        <div
                            className={classNames('picker__chosen', styles.chosen)}
                            role={onMiddleSquareClick ? 'button' : undefined}
                            onClick={onMiddleSquareClick}
                            style={{
                                gridColumn:
                                    typeof getChosenColPosition() === 'number'
                                        ? `${getChosenColPosition()} / span 1`
                                        : undefined,
                                gridRow:
                                    typeof getChosenRowPosition() === 'number'
                                        ? `${getChosenRowPosition()} / span 1`
                                        : undefined,
                            }}
                        >
                            {sup && (
                                <span className={classNames('picker__chosen-sup', styles['chosen-sup'])}>{sup}</span>
                            )}
                            {middleText && (
                                <div
                                    className={classNames('subhead picker__chosen-middle-text', styles['chosen-text'])}
                                >
                                    {middleText}
                                </div>
                            )}
                        </div>
                        {options.map((el, i) => (
                            <div
                                key={i}
                                className={classNames('js-picker__button-container', styles['button-container'])}
                                style={{
                                    gridColumn:
                                        typeof getButtonColPosition(i) === 'number'
                                            ? `${getButtonColPosition(i)} / span 1`
                                            : undefined,
                                    gridRow:
                                        typeof getButtonRowPosition(i) === 'number'
                                            ? `${getButtonRowPosition(i)} / span 1`
                                            : undefined,
                                }}
                            >
                                <div
                                    className={classNames(styles['button-wrapper'])}
                                    style={{ zIndex: focusedIndex === i ? 3 : '' }}
                                >
                                    {showTooltip && el.description ? (
                                        <Tooltip
                                            label={
                                                <div>
                                                    <div className={classNames('h4', styles['tooltip-top'])}>
                                                        {el.name}
                                                    </div>
                                                    <div className={styles['tooltip-content']}>{el.description}</div>
                                                </div>
                                            }
                                        >
                                            {renderButton(el, i)}
                                        </Tooltip>
                                    ) : (
                                        renderButton(el, i)
                                    )}
                                </div>
                                {renderButtonSlot?.(el)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    },
);

Picker.displayName = 'Picker';

export default Picker;
