import styles from './Select.module.scss';
import * as RadixSelect from '@radix-ui/react-select';
import classNames from 'classnames';
import { HTMLAttributes } from 'react';

type Props = RadixSelect.SelectProps & {
    options: {
        value: string | number;
        text: string;
        selected?: boolean;
    }[];
    contentProps?: HTMLAttributes<HTMLElement>;
    className?: string | undefined;
};

const Select = ({ options = [], contentProps = {}, ...props }: Props) => {
    return (
        <RadixSelect.Root {...props} defaultValue={`${props.defaultValue || options[0]?.value}`}>
            <RadixSelect.Trigger className={classNames(styles.trigger, props.className)}>
                <RadixSelect.Value />
                {/* <RadixSelect.Icon className={classNames(styles['trigger-icon'])}>
                    <ArrSVG />
                </RadixSelect.Icon> */}
            </RadixSelect.Trigger>
            <RadixSelect.Content className={classNames(styles.content, contentProps.className)}>
                <RadixSelect.ScrollUpButton />
                <RadixSelect.Viewport>
                    {options.map((option) => (
                        <RadixSelect.Item
                            key={option.value}
                            className={classNames(styles.item)}
                            value={`${option.value}`}
                        >
                            <RadixSelect.ItemText>{option.text}</RadixSelect.ItemText>
                            {/* <RadixSelect.ItemIndicator>
                                <CheckSVG />
                            </RadixSelect.ItemIndicator> */}
                        </RadixSelect.Item>
                    ))}
                </RadixSelect.Viewport>
                <RadixSelect.ScrollDownButton />
            </RadixSelect.Content>
        </RadixSelect.Root>
    );
};

export default Select;
