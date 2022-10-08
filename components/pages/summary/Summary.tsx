import produce from 'immer';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { mediaQueryDeviceState } from '@/atoms/media-query-device';
import SummaryContentDesktopAndTablet from './SummaryContentDesktopAndTablet';
import SummaryContentMobile from './SummaryContentMobile';

type SummarySuggestion = {
    id: number;
    description?: string;
    name: string;
    selected: boolean;
};

export interface Props {
    //
}

const Summary = (props: Props) => {
    const [suggestionsData, setSuggestionsData] = useState<SummarySuggestion[]>([
        {
            id: 1,
            name: 'Clogged Pores',
            description: `
                <p>You are getting this concern because</p>
                <p>Your age group is</p>
                <p>20-29</p>
                <p>A.I. has detected</p>
                <ul>
                    <li><b>Crow's Feet Wrinkles</b></li>
                    <li><b>Crow's Feet Wrinkles</b></li>
                    <li><b>Crow's Feet Wrinkles</b></li>
                </ul>
                <p>Your skin is<p>
                <ul>
                    <li><b>dark</b></li>
                    <li><b>dehydrated</b></li>
                </ul>
            `,
            selected: false,
        },
        {
            id: 2,
            name: 'Oily skin',
            description: `
                <p>You are getting this concern because</p>
                <p>Your age group is</p>
                <p>20-29</p>
                <p>A.I. has detected</p>
                <ul>
                    <li><b>Crow's Feet Wrinkles</b></li>
                    <li><b>Crow's Feet Wrinkles</b></li>
                    <li><b>Crow's Feet Wrinkles</b></li>
                </ul>
                <p>Your skin is<p>
                <ul>
                    <li><b>dark</b></li>
                    <li><b>dehydrated</b></li>
                </ul>
            `,
            selected: false,
        },
        {
            id: 3,
            name: 'Wrinkling',
            description: `
                <p>You are getting this concern because</p>
                <p>Your age group is</p>
                <p>20-29</p>
                <p>A.I. has detected</p>
                <ul>
                    <li><b>Crow's Feet Wrinkles</b></li>
                    <li><b>Crow's Feet Wrinkles</b></li>
                    <li><b>Crow's Feet Wrinkles</b></li>
                </ul>
                <p>Your skin is<p>
                <ul>
                    <li><b>dark</b></li>
                    <li><b>dehydrated</b></li>
                </ul>
            `,
            selected: false,
        },
        {
            id: 4,
            name: 'Dark Circles',
            description: `
                <p>You are getting this concern because</p>
                <p>Your age group is</p>
                <p>20-29</p>
                <p>A.I. has detected</p>
                <ul>
                    <li><b>Crow's Feet Wrinkles</b></li>
                    <li><b>Crow's Feet Wrinkles</b></li>
                    <li><b>Crow's Feet Wrinkles</b></li>
                </ul>
                <p>Your skin is<p>
                <ul>
                    <li><b>dark</b></li>
                    <li><b>dehydrated</b></li>
                </ul>
            `,
            selected: false,
        },
        {
            id: 5,
            name: 'Dryness/ dehydration',
            description: `
                <p>You are getting this concern because</p>
                <p>Your age group is</p>
                <p>20-29</p>
                <p>A.I. has detected</p>
                <ul>
                    <li><b>Crow's Feet Wrinkles</b></li>
                    <li><b>Crow's Feet Wrinkles</b></li>
                    <li><b>Crow's Feet Wrinkles</b></li>
                </ul>
                <p>Your skin is<p>
                <ul>
                    <li><b>dark</b></li>
                    <li><b>dehydrated</b></li>
                </ul>
            `,
            selected: false,
        },
        {
            id: 6,
            name: 'Sun damage',
            description: `
                <p>You are getting this concern because</p>
                <p>Your age group is</p>
                <p>20-29</p>
                <p>A.I. has detected</p>
                <ul>
                    <li><b>Crow's Feet Wrinkles</b></li>
                    <li><b>Crow's Feet Wrinkles</b></li>
                    <li><b>Crow's Feet Wrinkles</b></li>
                </ul>
                <p>Your skin is<p>
                <ul>
                    <li><b>dark</b></li>
                    <li><b>dehydrated</b></li>
                </ul>
            `,
            selected: false,
        },
        {
            id: 7,
            name: 'Signs of aging',
            description: `
                <p>You are getting this concern because</p>
                <p>Your age group is</p>
                <p>20-29</p>
                <p>A.I. has detected</p>
                <ul>
                    <li><b>Crow's Feet Wrinkles</b></li>
                    <li><b>Crow's Feet Wrinkles</b></li>
                    <li><b>Crow's Feet Wrinkles</b></li>
                </ul>
                <p>Your skin is<p>
                <ul>
                    <li><b>dark</b></li>
                    <li><b>dehydrated</b></li>
                </ul>
            `,
            selected: false,
        },
        {
            id: 8,
            name: 'Textural irregularities',
            description: `
                <p>You are getting this concern because</p>
                <p>Your age group is</p>
                <p>20-29</p>
                <p>A.I. has detected</p>
                <ul>
                    <li><b>Crow's Feet Wrinkles</b></li>
                    <li><b>Crow's Feet Wrinkles</b></li>
                    <li><b>Crow's Feet Wrinkles</b></li>
                </ul>
                <p>Your skin is<p>
                <ul>
                    <li><b>dark</b></li>
                    <li><b>dehydrated</b></li>
                </ul>
            `,
            selected: false,
        },
        {
            id: 9,
            name: 'Uneven skin tone',
            description: `
                <p>You are getting this concern because</p>
                <p>Your age group is</p>
                <p>20-29</p>
                <p>A.I. has detected</p>
                <ul>
                    <li><b>Crow's Feet Wrinkles</b></li>
                    <li><b>Crow's Feet Wrinkles</b></li>
                    <li><b>Crow's Feet Wrinkles</b></li>
                </ul>
                <p>Your skin is<p>
                <ul>
                    <li><b>dark</b></li>
                    <li><b>dehydrated</b></li>
                </ul>
            `,
            selected: false,
        },
        {
            id: 10,
            name: 'Dullness/ luckluster tone',
            description: `
                <p>You are getting this concern because</p>
                <p>Your age group is</p>
                <p>20-29</p>
                <p>A.I. has detected</p>
                <ul>
                    <li><b>Crow's Feet Wrinkles</b></li>
                    <li><b>Crow's Feet Wrinkles</b></li>
                    <li><b>Crow's Feet Wrinkles</b></li>
                </ul>
                <p>Your skin is<p>
                <ul>
                    <li><b>dark</b></li>
                    <li><b>dehydrated</b></li>
                </ul>
            `,
            selected: false,
        },
        {
            id: 11,
            name: 'Sun damage',
            description: `
                <p>You are getting this concern because</p>
                <p>Your age group is</p>
                <p>20-29</p>
                <p>A.I. has detected</p>
                <ul>
                    <li><b>Crow's Feet Wrinkles</b></li>
                    <li><b>Crow's Feet Wrinkles</b></li>
                    <li><b>Crow's Feet Wrinkles</b></li>
                </ul>
                <p>Your skin is<p>
                <ul>
                    <li><b>dark</b></li>
                    <li><b>dehydrated</b></li>
                </ul>
            `,
            selected: false,
        },
    ]);
    const [mainSuggestionsData, setMainSuggestionsData] = useState<SummarySuggestion[]>([]);
    const [secondarySuggestionsData, setSecondarySuggestionsData] = useState<SummarySuggestion[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeSuggestion, setActiveSuggestion] = useState<SummarySuggestion | null>(null);
    const mediaQueryDevice = useRecoilValue(mediaQueryDeviceState);

    const selectSuggestion = (suggestion: SummarySuggestion) => {
        setSuggestionsData(
            produce(suggestionsData, (draftState) => {
                const newSelectedSuggestion = draftState.find((el) => el.id === suggestion.id);
                if (newSelectedSuggestion) {
                    newSelectedSuggestion.selected = true;
                }
            }),
        );
    };

    const deselectSuggestion = (suggestion: SummarySuggestion) => {
        setSuggestionsData(
            produce(suggestionsData, (draftState) => {
                const newDeselectedSuggestion = draftState.find((el) => el.id === suggestion.id);
                if (newDeselectedSuggestion) {
                    newDeselectedSuggestion.selected = false;
                }
            }),
        );
    };

    useEffect(() => {
        const timer = setTimeout(
            () => {
                setLoading(false);
            },
            process.env.NODE_ENV === 'development' ? 100 : 3000,
        );

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        setMainSuggestionsData(suggestionsData.slice(0, 3));
        setSecondarySuggestionsData(suggestionsData.slice(3));
    }, [suggestionsData]);

    return (
        <div className="summary-content">
            <div className="summary-top-container">
                <div className="text-transition-container">
                    <div className="introduction-title js-summary-title">A. I. summary</div>
                </div>
                <div className="text-transition-container summary-title">
                    <h1 className="h2 js-summary-title">Summary</h1>
                </div>
                {!loading && (
                    <div className="summary-description-container text-transition-container">
                        <p className="js-summary-description">
                            Based on the conditional logic A.I. recommends to focus on the following concerns
                        </p>
                    </div>
                )}
            </div>
            {!loading &&
                (mediaQueryDevice.includes('mobile') ? (
                    <SummaryContentMobile
                        suggestionsData={suggestionsData}
                        mainSuggestionsData={mainSuggestionsData}
                        secondarySuggestionsData={secondarySuggestionsData}
                        selectSuggestion={selectSuggestion}
                        deselectSuggestion={deselectSuggestion}
                        activeSuggestion={activeSuggestion}
                        setActiveSuggestion={setActiveSuggestion}
                    />
                ) : (
                    <SummaryContentDesktopAndTablet
                        suggestionsData={suggestionsData}
                        mainSuggestionsData={mainSuggestionsData}
                        secondarySuggestionsData={secondarySuggestionsData}
                        selectSuggestion={selectSuggestion}
                        deselectSuggestion={deselectSuggestion}
                        activeSuggestion={activeSuggestion}
                        setActiveSuggestion={setActiveSuggestion}
                    />
                ))}
        </div>
    );
};

export default Summary;
