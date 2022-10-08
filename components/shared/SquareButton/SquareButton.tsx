import { forwardRef, HTMLAttributes } from 'react';
import classNames from 'classnames';

export interface Props extends HTMLAttributes<HTMLElement> {
    sup?: string;
}

const SquareButton = forwardRef<HTMLButtonElement, Props>(({ children, sup, ...props }, ref) => {
    return (
        <button {...props} ref={ref} className={classNames('square-button', props.className)}>
            <span className="square-button__el">
                {sup && <span className="summary-square-button__el-count">{sup}</span>}
                <span className="subhead square-button__el-text">{children}</span>
            </span>
        </button>
    );
});

SquareButton.displayName = 'SquareButton';

export default SquareButton;
