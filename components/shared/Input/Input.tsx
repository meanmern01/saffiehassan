import styles from './Input.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { mergeRefs } from 'react-merge-refs';

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    /**
     * Container props (.input-group)
     */
    containerProps?: React.HTMLAttributes<HTMLDivElement>;
    /**
     * Is error validation
     */
    error?: boolean;
    /**
     * Tip or message
     */
    message?: string;
    /**
     * Icon
     */
    icon?: JSX.Element;
    /**
     * Label
     */
    label?: string;
}

const Input = React.forwardRef<HTMLInputElement, Props>(
    ({ containerProps = {}, message = '', label, error = false, icon, ...props }, ref) => {
        const input = useRef<HTMLInputElement>(null);
        const [labelVisible, setLabelVisible] = useState(true);

        function onBlur() {
            if (input.current) {
                setLabelVisible(input.current.value.length === 0);
            }
        }

        useEffect(() => {
            onBlur();
        }, []);

        return (
            <div
                {...containerProps}
                className={classNames('input-group', styles.group, containerProps.className, {
                    [styles.error]: error,
                    [styles['group--label-hidden']]: !labelVisible,
                })}
            >
                <input
                    {...props}
                    ref={mergeRefs([ref, input])}
                    className={classNames('form-control', styles.input, props.className)}
                    data-testid="input-el"
                    onBlur={(event) => {
                        onBlur();
                        props.onBlur?.(event);
                    }}
                />
                {label && (
                    <label htmlFor={props.id} className={classNames('input-label', styles.label)}>
                        {label}
                    </label>
                )}
                {icon && <div className={styles.icon}>{icon}</div>}
                <div
                    className={classNames('input-message', styles.message)}
                    aria-live="polite"
                    aria-describedby={props.id}
                >
                    {message}
                </div>
            </div>
        );
    },
);

Input.displayName = 'Input';

export default Input;
