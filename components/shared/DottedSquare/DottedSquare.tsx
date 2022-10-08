import classNames from 'classnames';
import { forwardRef, HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLElement> & {
    /**
     * Whether the square is expanded or collapsed
     */
    expanded?: boolean;
    /**
     * When true, the squares spin
     */
    animated?: boolean;
};

const DottedSquare = forwardRef<HTMLDivElement, Props>(({ expanded = false, animated = false, ...props }, ref) => {
    return (
        <span
            {...props}
            ref={ref}
            className={classNames('dotted-square', props.className, {
                'is-expanded': expanded,
                'is-animated': animated,
            })}
        ></span>
    );
});

DottedSquare.displayName = 'DottedSquare';

export default DottedSquare;
