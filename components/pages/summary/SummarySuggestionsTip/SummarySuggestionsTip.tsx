import { HTMLAttributes } from 'react';
import classNames from 'classnames';

export interface Props extends HTMLAttributes<HTMLElement> {
    mainText: string;
    secondaryText?: string;
}

const SummarySuggestionsTip = ({ mainText, secondaryText, ...props }: Props) => {
    return (
        <div {...props} className={classNames('summary-main-suggestions-tip', props.className)}>
            <div className="text-transition-container summary-main-suggestions-tip__main">
                <div className="h5 js-summary-main-suggestions-tip__main">{mainText}</div>
            </div>
            {secondaryText && (
                <div className="text-transition-container summary-main-suggestions-tip__secondary">
                    <div className="js-summary-main-suggestions-tip__secondary">Select or deselect concerns</div>
                </div>
            )}
        </div>
    );
};

export default SummarySuggestionsTip;
