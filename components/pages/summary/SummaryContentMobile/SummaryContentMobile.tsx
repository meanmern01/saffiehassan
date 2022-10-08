import IconButton from '@/components/shared/IconButton';
import classNames from 'classnames';
import dynamic from 'next/dynamic';
import { Dispatch, SetStateAction, useState } from 'react';
import SummarySuggestionsTip from '../SummarySuggestionsTip';
import ArrLeftSVG from '@/svg/arr-left.svg';
import QuestionMarkSVG from '@/svg/question-mark.svg';
import SquareButton from '@/components/shared/SquareButton';

type SummarySuggestion = {
    id: number;
    description?: string;
    name: string;
    selected: boolean;
};

export interface Props {
    suggestionsData: SummarySuggestion[];
    mainSuggestionsData: SummarySuggestion[];
    secondarySuggestionsData: SummarySuggestion[];
    selectSuggestion: (suggestion: SummarySuggestion) => void;
    deselectSuggestion: (suggestion: SummarySuggestion) => void;
    activeSuggestion: SummarySuggestion | null;
    setActiveSuggestion: Dispatch<SetStateAction<SummarySuggestion | null>>;
}

const LitPopup = dynamic(() => import('@/components/shared/LitPopup'), { ssr: false });

const SummaryContentMobile = ({
    suggestionsData,
    mainSuggestionsData,
    secondarySuggestionsData,
    selectSuggestion,
    deselectSuggestion,
    activeSuggestion,
    setActiveSuggestion,
}: Props) => {
    const mainPopupName = 'summary-mobile-content-popup';
    const innerPopupName = 'summary-mobile-content-inner-popup';

    const [activeSuggestionData, setActiveSuggestionData] = useState(() => mainSuggestionsData);

    const select = (suggestion: SummarySuggestion) => {
        const isSelected = suggestionsData.find((s) => s.id === suggestion.id)?.selected;
        if (isSelected) {
            deselectSuggestion(suggestion);
        } else {
            selectSuggestion(suggestion);
        }
    };

    return (
        <div className="summary-content-mobile">
            <div className="summary-content-mobile__top">
                <SummarySuggestionsTip mainText="I want to focus on" secondaryText="Select or deselect concerns" />
            </div>

            <div className="summary-content-mobile__bottom">
                <SquareButton
                    sup={`${mainSuggestionsData.length}`}
                    className="summary-content-mobile__square-button js-picker__button-container"
                    data-lit-popup-open={mainPopupName}
                    onClick={() => setActiveSuggestionData(mainSuggestionsData)}
                >
                    A.I. Suggestions
                </SquareButton>
                <SquareButton
                    sup={`${secondarySuggestionsData.length}`}
                    className="summary-content-mobile__square-button js-picker__button-container"
                    data-lit-popup-open={mainPopupName}
                    onClick={() => setActiveSuggestionData(secondarySuggestionsData)}
                >
                    Possible concerns
                </SquareButton>
            </div>

            <LitPopup name={mainPopupName} className="summary-mobile-content-popup summary-mobile-content-popup--dark">
                <div className="summary-mobile-content-popup__top">
                    <IconButton
                        className="js-analysis-left-bottom-link"
                        icon={<ArrLeftSVG style={{ position: 'relative', top: 1, left: -1 }} />}
                        variant="light"
                        data-lit-popup-close={mainPopupName}
                    >
                        Back
                    </IconButton>
                </div>
                <div className="summary-mobile-content-popup__inner">
                    <div className="h4 summary-mobile-content-popup__title">
                        A.I. Suggestions<sup>{activeSuggestionData.length}</sup>
                    </div>
                    <div className="summary-mobile-content-popup__description">
                        Concerns A.I. has detected. Deselect if not necessary
                    </div>
                    <ul className="list-unstyled square-pickable__list summary-mobile-content-popup__list">
                        {activeSuggestionData.map((suggestion) => (
                            <li key={suggestion.id} className="square-pickable__list-item">
                                <button
                                    className={classNames('square-pickable__item', {
                                        'square-pickable__item--selected': suggestionsData.find(
                                            (s) => s.id === suggestion.id,
                                        )?.selected,
                                    })}
                                    onClick={() => select(suggestion)}
                                >
                                    <span>{suggestion.name}</span>
                                </button>
                                <SquareButton
                                    className="square-pickable__item-more-info-btn"
                                    aria-label="More info"
                                    data-lit-popup-open={innerPopupName}
                                    onClick={() => setActiveSuggestion(suggestion)}
                                >
                                    <QuestionMarkSVG />
                                </SquareButton>
                            </li>
                        ))}
                    </ul>
                </div>
            </LitPopup>

            <LitPopup name={innerPopupName} className="summary-mobile-content-popup summary-mobile-content-popup">
                <div className="summary-mobile-content-popup__top">
                    <IconButton
                        className="js-analysis-left-bottom-link"
                        icon={<ArrLeftSVG style={{ position: 'relative', top: 1, left: -1 }} />}
                        data-lit-popup-close={innerPopupName}
                    >
                        Back
                    </IconButton>
                </div>
                {activeSuggestion && (
                    <div className="summary-mobile-content-popup__inner">
                        <div className="h4 summary-mobile-content-popup__title">{activeSuggestion.name}</div>
                        {activeSuggestion.description && (
                            <div
                                className="summary-mobile-content-inner-popup__description"
                                dangerouslySetInnerHTML={{ __html: activeSuggestion.description }}
                            ></div>
                        )}
                    </div>
                )}
            </LitPopup>
        </div>
    );
};

export default SummaryContentMobile;
