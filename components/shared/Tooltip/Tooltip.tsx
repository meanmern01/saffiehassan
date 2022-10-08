import styles from './Tooltip.module.scss';
import { cloneElement, HTMLAttributes, useState } from 'react';
import {
    Placement,
    offset,
    flip,
    shift,
    autoUpdate,
    useFloating,
    useInteractions,
    useHover,
    useFocus,
    useRole,
    useDismiss,
} from '@floating-ui/react-dom-interactions';
import classNames from 'classnames';

export interface Props extends HTMLAttributes<HTMLElement> {
    /**
     * Tooltip inner markup
     */
    label: JSX.Element;
    placement?: Placement;
    children: JSX.Element;
    offset?: number;
    shift?: number;
}

const Tooltip = ({ children, label, placement = 'top-start', ...props }: Props) => {
    const [open, setOpen] = useState(false);

    const { x, y, reference, floating, strategy, context, update } = useFloating({
        placement,
        open,
        onOpenChange: setOpen,
        middleware: [
            offset(typeof props.offset === 'number' ? props.offset : 20),
            flip(),
            shift({ padding: typeof props.shift === 'number' ? props.shift : 8 }),
        ],
        whileElementsMounted: autoUpdate,
    });

    const { getReferenceProps, getFloatingProps } = useInteractions([
        useHover(context),
        useFocus(context),
        useRole(context, { role: 'tooltip' }),
        useDismiss(context),
    ]);

    return (
        <>
            {cloneElement(
                children,
                getReferenceProps({
                    ref: reference,
                    onMouseEnter: () => {
                        update();
                    },
                    ...children.props,
                }),
            )}
            {open && (
                <div
                    {...getFloatingProps({
                        ref: floating,
                        ...props,
                        className: classNames('text-sm tooltip', styles.tooltip, props.className),
                        style: {
                            position: strategy,
                            top: y ?? '',
                            left: x ?? '',
                        },
                    })}
                >
                    {label}
                </div>
            )}
        </>
    );
};

export default Tooltip;
