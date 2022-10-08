import styles from './ActionWithConfirmation.module.scss';
import { cloneElement, HTMLAttributes, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import {
    Placement,
    offset,
    flip,
    shift,
    autoUpdate,
    useFloating,
    useInteractions,
    useRole,
    useDismiss,
    useClick,
} from '@floating-ui/react-dom-interactions';
import AppMessage from '../AppMessage';

export interface Props extends HTMLAttributes<HTMLElement> {
    /**
     * Confirmation popup title
     */
    popupTitle?: string;
    /**
     * Confirmation popup content part
     */
    popupContent?: JSX.Element;
    /**
     * Confirmation popup bottom slot  (usually for actions)
     */
    popupActionsSlot?: JSX.Element;
    placement?: Placement;
    children: JSX.Element;
    offset?: number;
    shift?: number;
    onConfirm?: () => void;
    containerProps?: HTMLAttributes<HTMLDivElement>;
}

const ActionWithConfirmation = ({
    children,
    popupTitle,
    popupContent,
    popupActionsSlot,
    placement = 'bottom-start',
    onConfirm,
    containerProps,
    ...props
}: Props) => {
    const container = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    const { x, y, reference, floating, strategy, context } = useFloating({
        placement,
        open: visible,
        onOpenChange: setVisible,
        middleware: [
            offset(typeof props.offset === 'number' ? props.offset : 10),
            flip(),
            shift({ padding: typeof props.shift === 'number' ? props.shift : 8 }),
        ],
        whileElementsMounted: autoUpdate,
    });

    const { getReferenceProps, getFloatingProps } = useInteractions([
        useRole(context, { role: 'alertdialog' }),
        useDismiss(context),
        useClick(context),
    ]);

    useEffect(() => {
        let confirmEls: HTMLElement[] = [];

        const onClick = () => {
            onConfirm?.();
            setVisible(false);
        };

        if (visible && container.current) {
            confirmEls = Array.from(container.current.querySelectorAll('[data-confirmation="accept"]'));

            confirmEls?.forEach((el) => {
                el.addEventListener('click', onClick);
            });
        }

        return () => {
            if (!visible) {
                confirmEls.forEach((el) => {
                    el.removeEventListener('click', onClick);
                });
                confirmEls = [];
            }
        };
    }, [visible, onConfirm]);

    useEffect(() => {
        let cancelEls: HTMLElement[] = [];

        const onClick = () => {
            setVisible(false);
        };

        if (visible && container.current) {
            cancelEls = Array.from(container.current.querySelectorAll('[data-confirmation="cancel"]'));

            cancelEls.forEach((el) => {
                el.addEventListener('click', onClick);
            });
        }

        return () => {
            if (!visible) {
                cancelEls.forEach((el) => {
                    el.removeEventListener('click', onClick);
                });
                cancelEls = [];
            }
        };
    }, [visible]);

    return (
        <div {...containerProps} ref={container} className={classNames(styles.container, containerProps?.className)}>
            {cloneElement<HTMLElement>(
                children,
                getReferenceProps({
                    ref: reference,
                    onClick: (event) => {
                        setVisible(true);
                        props.onClick?.(event);
                    },
                    ...children.props,
                }),
            )}
            <div
                {...getFloatingProps({
                    ref: floating,
                    ...props,
                    className: classNames(styles.popup, props.className),
                    style: {
                        position: strategy,
                        top: y ?? '',
                        left: x ?? '',
                    },
                })}
            >
                <AppMessage visible={visible} text={popupContent} actionsSlot={popupActionsSlot}>
                    {popupTitle}
                </AppMessage>
            </div>
        </div>
    );
};

export default ActionWithConfirmation;
