import styles from './IconButton.module.scss';
import React, { ReactNode } from 'react';
import classNames from 'classnames';

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Tag to render
     */
    as?: string;
    /**
     * Direction
     */
    direction?: 'horizontal' | 'vertical';
    /**
     * An SVG icon
     */
    icon?: ReactNode;
    /**
     * Icon position
     */
    iconPosition?: 'left' | 'right';
    /**
     * Whether the text is visually-hidden
     */
    textVisible?: boolean;
    /**
     * Color theme
     */
    variant?: 'light' | 'dark';
}

const IconButton = React.forwardRef<HTMLElement, Props>(
    (
        {
            children,
            as = 'button',
            direction = 'horizontal',
            variant = 'dark',
            icon,
            iconPosition = 'left',
            textVisible = true,
            ...props
        },
        ref,
    ) => {
        const Tag = as;

        return (
            <Tag
                {...props}
                ref={ref}
                className={classNames(
                    'text-button',
                    styles.btn,
                    styles[`btn-${variant}`],
                    styles[`btn-${direction}`],
                    styles[`btn--icon-${iconPosition}`],
                    props.className,
                )}
            >
                <span className={classNames('icon-btn__icon', styles['btn-icon'])}>
                    <span className={classNames('icon-btn__icon-inner', styles['btn-icon-inner'])}>{icon}</span>
                </span>
                <span className={classNames('icon-btn__text', styles['btn-text'], { 'visually-hidden': !textVisible })}>
                    {children}
                </span>
            </Tag>
        );
    },
);

IconButton.displayName = 'IconButton';

export default IconButton;
