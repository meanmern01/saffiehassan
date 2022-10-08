import styles from './NestedPicker.module.scss';
import { Dispatch, forwardRef, HTMLAttributes, SetStateAction, useState } from 'react';
import classNames from 'classnames';
import Picker from '../Picker';
import type { PickerOption } from '../Picker/types';

type PickerOptionWithOptions = PickerOption & { options?: PickerOption[] };

interface Props extends HTMLAttributes<HTMLDivElement> {
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
    showTooltip?: boolean;
}

const TOP_LEVEL_PICKER_ID = '0-0';

const NestedPickerInner = ({
    options = [],
    middleText,
    deepIndex,
    currentDeepIndex,
    setCurrentDeepIndex,
    onPick,
    pickerId,
    parentPickerId,
    activePickerId,
    setActivePickerId,
    distribution = 'center',
    showTooltip = false,
}: {
    options: PickerOptionWithOptions[];
    distribution?: 'center' | 'left' | 'right' | 'top' | 'bottom';
    middleText?: string;
    deepIndex: number;
    currentDeepIndex: number;
    setCurrentDeepIndex: Dispatch<SetStateAction<number>>;
    pickerId: string;
    parentPickerId?: string;
    activePickerId: string;
    setActivePickerId: Dispatch<SetStateAction<string>>;
    onPick?: (obj: PickerOptionWithOptions) => void;
    showTooltip?: boolean;
}) => {
    const pick = (pickedOption: PickerOptionWithOptions) => {
        onPick?.(pickedOption);
        setCurrentDeepIndex(0);
        setActivePickerId(TOP_LEVEL_PICKER_ID);
    };

    const goDeeper = (index: number) => {
        const nextIndex = deepIndex + 1;
        setActivePickerId(`${nextIndex}-${index}`);
        setCurrentDeepIndex(nextIndex);
    };

    const goShallower = () => {
        const nextIndex = deepIndex - 1;
        setActivePickerId(parentPickerId || TOP_LEVEL_PICKER_ID);
        setCurrentDeepIndex(nextIndex);
    };

    return deepIndex < currentDeepIndex || pickerId === activePickerId ? (
        <Picker
            options={options}
            middleText={middleText}
            distribution={distribution}
            showTooltip={showTooltip}
            className={classNames(styles.picker, { [styles.inner]: deepIndex > 0 })}
            onPick={(pickedOption: PickerOptionWithOptions) =>
                !Array.isArray(pickedOption.options) || pickedOption.options.length === 0
                    ? pick(pickedOption)
                    : goDeeper(options.indexOf(pickedOption))
            }
            onMiddleSquareClick={goShallower}
            renderButtonSlot={(option: PickerOptionWithOptions) =>
                Array.isArray(option.options) && option.options.length > 0 ? (
                    <NestedPickerInner
                        pickerId={`${deepIndex + 1}-${options.indexOf(option)}`}
                        parentPickerId={pickerId}
                        middleText={option.name}
                        options={option.options}
                        deepIndex={deepIndex + 1}
                        currentDeepIndex={currentDeepIndex}
                        setCurrentDeepIndex={setCurrentDeepIndex}
                        onPick={onPick}
                        activePickerId={activePickerId}
                        setActivePickerId={setActivePickerId}
                    />
                ) : null
            }
            renderButtonInnerSlot={(option: PickerOptionWithOptions) =>
                Array.isArray(option.options) && option.options.length > 0 ? (
                    <sup className={styles['el-text__sup']}>{option.options.length}</sup>
                ) : null
            }
            style={{ visibility: pickerId === activePickerId ? 'visible' : 'hidden' }}
        />
    ) : null;
};

const NestedPicker = forwardRef<HTMLDivElement, Props>(
    ({ options = [], middleText, showTooltip = false, distribution = 'center', onPick, ...props }, ref) => {
        const [currentDeepIndex, setCurrentDeepIndex] = useState(0);
        const [activePickerId, setActivePickerId] = useState(TOP_LEVEL_PICKER_ID);

        return (
            <div {...props} ref={ref}>
                <NestedPickerInner
                    pickerId={TOP_LEVEL_PICKER_ID}
                    middleText={middleText}
                    options={options}
                    deepIndex={0}
                    currentDeepIndex={currentDeepIndex}
                    setCurrentDeepIndex={setCurrentDeepIndex}
                    onPick={onPick}
                    activePickerId={activePickerId}
                    setActivePickerId={setActivePickerId}
                    showTooltip={showTooltip}
                />
            </div>
        );
    },
);

NestedPicker.displayName = 'NestedPicker';

export default NestedPicker;
