import styles from './Button.module.scss';
import React from 'react';
import classnames from 'classnames';

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Tag to render
     */
    as?: string;
    geometryVariant?: 'wide' | 'normal';
    size?: 'md' | 'sm';
    uppercase?: boolean;
    /**
     * Color theme
     */
    variant?: 'default' | 'dark' | 'outline-dark';
}

const Button = React.forwardRef<HTMLElement, Props>(
    (
        {
            children,
            uppercase = true,
            size = 'md',
            variant = 'default',
            as = 'button',
            geometryVariant = 'normal',
            ...props
        },
        ref,
    ) => {
        const Tag = as;

        return (
            <Tag
                {...props}
                ref={ref}
                className={classnames(
                    'text-button',
                    styles.btn,
                    styles[`btn-${variant}`],
                    styles[`btn-${size}`],
                    styles[`btn-geometry-${geometryVariant}`],
                    props.className,
                    {
                        [styles.uppercase]: uppercase,
                    },
                )}
                data-hover={children}
            >
                <span className={styles['btn-inner']}>{children}</span>
            </Tag>
        );
    },
);

Button.displayName = 'Button';

export default Button;
