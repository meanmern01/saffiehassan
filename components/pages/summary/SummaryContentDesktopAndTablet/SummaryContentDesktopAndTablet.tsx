import classNames from 'classnames';
import { Dispatch, Ref, SetStateAction, useEffect, useRef, useState, useTransition } from 'react';
import { useRecoilValue } from 'recoil';
import IconButton from '@/components/shared/IconButton';
import ArrLeftIcon from '@/svg/arr-left.svg';
import Picker from '@/components/shared/Picker';
import { useDebounce } from '@/hooks/use-debounce';
import { PickerOption } from '@/components/shared/Picker/types';
import { mediaQueryDeviceState } from '@/atoms/media-query-device';
import SummaryInfoCard from '../SummaryInfoCard';
import SummarySuggestionsTip from '../SummarySuggestionsTip';
import SquareButton from '@/components/shared/SquareButton';
import { usePrevious } from '@/hooks/use-previous';

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

const SummaryContentDesktopAndTablet = ({
    suggestionsData,
    mainSuggestionsData,
    secondarySuggestionsData,
    selectSuggestion,
    deselectSuggestion,
    activeSuggestion,
    setActiveSuggestion,
}: Props) => {
    const [isSecondaryPickerVisible, setIsSecondaryPickerVisible] = useState(false);
    const debouncedIsSecondaryPickerVisible = useDebounce(isSecondaryPickerVisible, 500);

    const debouncedActiveSuggestion = useDebounce(activeSuggestion, 700);

    const [isContentTransitioning, setIsContentTransitioning] = useState(false);
    const [contentOffsetX, setContentOffsetX] = useState(0);
    const prevContentOffsetX = usePrevious(contentOffsetX);

    const contentTransitioningTimeout = useRef<NodeJS.Timeout>();
    const mainInnerEl = useRef<HTMLDivElement>(null);
    const summaryInfoEl = useRef<HTMLDivElement>(null);
    const secondaryPickerEl = useRef<HTMLDivElement>(null);

    const mediaQueryDevice = useRecoilValue(mediaQueryDeviceState);
    const [_, startTransition] = useTransition();

    const pickSuggestion = (pickerOption: PickerOption, direction: 'left' | 'right') => {
        const newActiveSuggestion = suggestionsData.find((suggestion) => suggestion.id === pickerOption.id);

        setActiveSuggestion(newActiveSuggestion || null);

        startTransition(() => {
            setIsSecondaryPickerVisible(direction === 'right');
        });
    };

    useEffect(() => {
        if (summaryInfoEl.current && mainInnerEl.current) {
            const infoElRect = summaryInfoEl.current.getBoundingClientRect();
            const mainInnerElRect = mainInnerEl.current.getBoundingClientRect();

            if (isSecondaryPickerVisible) {
                if (secondaryPickerEl.current) {
                    const secondaryPickerElRect = secondaryPickerEl.current.getBoundingClientRect();

                    if (activeSuggestion) {
                        if (mediaQueryDevice === 'horizontal-tablet') {
                            setContentOffsetX(-(secondaryPickerElRect.width + infoElRect.width) * 0.83);
                        } else if (mediaQueryDevice === 'vertical-tablet') {
                            setContentOffsetX(-(secondaryPickerElRect.width + infoElRect.width) * 0.85);
                        } else {
                            setContentOffsetX(-secondaryPickerElRect.width);
                        }
                    } else {
                        if (mediaQueryDevice === 'horizontal-tablet') {
                            setContentOffsetX(-secondaryPickerElRect.width * 0.82);
                        } else if (mediaQueryDevice === 'vertical-tablet') {
                            setContentOffsetX(-secondaryPickerElRect.width * 1.1);
                        } else {
                            setContentOffsetX(-secondaryPickerElRect.width);
                        }
                    }
                }
            } else {
                if (activeSuggestion) {
                    if (mainInnerElRect.left <= infoElRect.width) {
                        if (mediaQueryDevice.includes('tablet')) {
                            setContentOffsetX(infoElRect.width + 40);
                        } else {
                            setContentOffsetX(infoElRect.width - mainInnerElRect.left + 40);
                        }
                    } else {
                        setContentOffsetX(0);
                    }
                } else {
                    setContentOffsetX(0);
                }
            }
        }
    }, [mediaQueryDevice, isSecondaryPickerVisible, activeSuggestion]);

    useEffect(() => {
        const TRANSITION_DURATION = 1300; // from css
        const TRANSITION_DELAY = 200; // from css

        if (contentOffsetX !== prevContentOffsetX) {
            clearTimeout(contentTransitioningTimeout.current);
            setIsContentTransitioning(true);
            contentTransitioningTimeout.current = setTimeout(
                () => setIsContentTransitioning(false),
                TRANSITION_DURATION + TRANSITION_DELAY,
            );
        }
    }, [contentOffsetX, prevContentOffsetX]);

    const renderSummaryInfoCard = (position: 'left' | 'right', isRevealed = false, ref?: Ref<HTMLDivElement>) => {
        const suggestionToRender = activeSuggestion || debouncedActiveSuggestion;

        return (
            <SummaryInfoCard
                ref={ref}
                name={suggestionToRender?.name}
                description={suggestionToRender?.description}
                className={classNames(`summary-main-container__${position} summary-main-container__info`, {
                    'is-revealed': isRevealed,
                })}
                selected={
                    suggestionsData.find((suggestion) => suggestionToRender && suggestion.id === suggestionToRender.id)
                        ?.selected
                }
                select={activeSuggestion ? () => selectSuggestion(activeSuggestion) : undefined}
                deselect={activeSuggestion ? () => deselectSuggestion(activeSuggestion) : undefined}
                onClose={() => setActiveSuggestion(null)}
            />
        );
    };

    return (
        <div className="summary-main-container">
            {renderSummaryInfoCard('left', !!activeSuggestion && !isSecondaryPickerVisible, summaryInfoEl)}

            <div className="summary-main" style={{ zIndex: isContentTransitioning ? 3 : undefined }}>
                <div ref={mainInnerEl}>
                    <div
                        className="summary-main-inner"
                        style={{ transform: `translate3d(${contentOffsetX}px, 0px, 0px)` }}
                    >
                        <Picker
                            distribution={
                                mediaQueryDevice === 'vertical-tablet' || mediaQueryDevice.includes('mobile')
                                    ? 'bottom'
                                    : 'left'
                            }
                            middleText="A.I. suggestions"
                            options={mainSuggestionsData}
                            onPick={(pickerOption) => pickSuggestion(pickerOption, 'left')}
                            className="summary-main-picker"
                        />

                        <SummarySuggestionsTip
                            mainText="I want to focus on"
                            secondaryText="Select or deselect concerns"
                        />

                        <div className="summary-main-content">
                            <SquareButton
                                sup={`${secondarySuggestionsData.length}`}
                                className={classNames(
                                    'summary-main__havent-found-btn summary-main-content__el js-picker__button-container',
                                    {
                                        'summary-main-content__el--visible': !debouncedIsSecondaryPickerVisible,
                                    },
                                )}
                                onClick={() => {
                                    setActiveSuggestion(null);
                                    setIsSecondaryPickerVisible(true);
                                }}
                            >
                                Haven&apos;t found yours?
                            </SquareButton>
                            <div
                                className={classNames(
                                    'summary-main-secondary-picker-wrapper summary-main-content__el',
                                    { 'summary-main-content__el--visible': debouncedIsSecondaryPickerVisible },
                                )}
                            >
                                <IconButton
                                    icon={<ArrLeftIcon style={{ position: 'relative', top: 1, left: -1 }} />}
                                    onClick={() => {
                                        setActiveSuggestion(null);
                                        setIsSecondaryPickerVisible(false);
                                    }}
                                    textVisible={false}
                                    className="summary-main-secondary-picker-back-btn"
                                >
                                    Back
                                </IconButton>
                                <Picker
                                    ref={secondaryPickerEl}
                                    distribution={
                                        mediaQueryDevice === 'vertical-tablet' || mediaQueryDevice.includes('mobile')
                                            ? 'bottom'
                                            : 'right'
                                    }
                                    sup={`${secondarySuggestionsData.length}`}
                                    middleText="Haven't found yours?"
                                    options={secondarySuggestionsData}
                                    onPick={(pickerOption) => pickSuggestion(pickerOption, 'right')}
                                    className="summary-main-picker"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {renderSummaryInfoCard('right', !!activeSuggestion && isSecondaryPickerVisible)}
        </div>
    );
};

export default SummaryContentDesktopAndTablet;
