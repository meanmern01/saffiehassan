import DottedSquare from '@/components/shared/DottedSquare';
import classNames from 'classnames';
import { forwardRef, HTMLAttributes, ReactNode } from 'react';

type Props = HTMLAttributes<HTMLElement> & {
    title?: string;
    icon?: ReactNode;
    titlePosition?: 'left' | 'right';
};

const AccessButton = forwardRef<HTMLButtonElement, Props>(
    ({ title, icon, titlePosition = 'left', children, ...props }, ref) => {
        return (
            <>
                <button
                    {...props}
                    ref={ref}
                    className={classNames('access-btn', `access-btn--${titlePosition}`, props.className)}
                >
                    <DottedSquare expanded animated className="access-btn__square" />
                    <span className="access-btn__center">
                        {icon && <span className="access-btn__icon">{icon}</span>}
                        {title && <span className="text-caption access-btn__text">{title}</span>}
                    </span>
                </button>
                {children}
            </>
        );
    },
);

AccessButton.displayName = 'AccessButton';

export default AccessButton;
