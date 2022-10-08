// import './LitPopup.scss';
import { useState, useEffect, useRef, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import LitPopup from 'lit-popup';
import classNames from 'classnames';

type Props = React.HTMLAttributes<HTMLElement> & {
    containerClass?: string;
    name: string;
    onOpen?: (instance: LitPopup) => void;
    onOpenComplete?: (instance: LitPopup) => void;
    onClose?: (instance: LitPopup) => void;
    onCloseComplete?: (instance: LitPopup) => void;
    opened?: boolean;
    overlay?: boolean;
    wrapperChildren?: ReactNode;
};

const NO_SCROLL_CLASS = 'no-scroll';

const LitPopupComponent = ({
    children,
    wrapperChildren,
    containerClass = '',
    name,
    onOpen,
    onOpenComplete,
    onClose,
    onCloseComplete,
    opened,
    overlay,
    ...props
}: Props) => {
    const root = document.querySelector('#portal-root');
    const leaveDurationInSeconds = 0.3;

    const [instance, setInstance] = useState<LitPopup | null>(null);
    const leaveTimeout = useRef<NodeJS.Timeout>();
    const closeAnimationTimeout = useRef<NodeJS.Timeout>();

    useEffect(() => {
        const instance = new LitPopup(name, {
            onOpen: () => {
                if (typeof leaveTimeout.current !== 'undefined') {
                    clearTimeout(leaveTimeout.current);
                }
                document.body.classList.add(NO_SCROLL_CLASS);
                onOpen?.(instance);
            },
            onOpenComplete: () => {
                const focusableOnOpenElement = instance.el.querySelector<HTMLElement>('[data-focus-on-popup-open]');
                setTimeout(() => focusableOnOpenElement?.focus({ preventScroll: true }), 50);
                onOpenComplete?.(instance);
            },
            onClose: () => {
                leaveTimeout.current = setTimeout(() => {
                    document.body.classList.remove(NO_SCROLL_CLASS);
                }, leaveDurationInSeconds * 1000);
                onClose?.(instance);
            },
            onCloseComplete: () => {
                onCloseComplete?.(instance);
            },
            closeAnimation: () =>
                new Promise((resolve) => {
                    clearTimeout(closeAnimationTimeout.current);
                    closeAnimationTimeout.current = setTimeout(resolve, leaveDurationInSeconds * 1000);
                }),
        });
        setInstance(instance);

        return () => {
            clearTimeout(leaveTimeout.current);
            clearTimeout(closeAnimationTimeout.current);
            instance.destroy();
            setInstance(null);
            document.body.classList.remove(NO_SCROLL_CLASS);
        };
    }, [name, onClose, onCloseComplete, onOpen, onOpenComplete]);

    useEffect(() => {
        if (instance) {
            if (opened) {
                if (!instance.isOpen) {
                    instance.open();
                }
            } else if (instance.isOpen) {
                instance.close();
            }
        }
    }, [instance, opened]);

    const Component = (
        <div
            {...props}
            className={classNames('lit-popup', props.className)}
            data-lit-popup={name}
            data-lit-popup-preset="default"
        >
            {overlay && <div className="lit-popup-overlay" data-lit-popup-close={name}></div>}
            {wrapperChildren}
            <div className={classNames('lit-popup-container', containerClass)}>{children}</div>
        </div>
    );

    return typeof window !== 'undefined' && root ? createPortal(Component, root) : null;
};

export default LitPopupComponent;
