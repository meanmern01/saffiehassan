import { useEffect, useState } from 'react';
import produce from 'immer';
import classNames from 'classnames';
import { PickerOption } from '@/components/shared/Picker/types';
import FormulaNestedPicker from '../FormulaNestedPicker';
import FormulaFragnanceCard from '../FormulaFragnanceCard';
import FormulaIngredientCard from './FormulaIngredientCard';

type FormulaSuggestion = {
    id: number;
    description?: string;
    name: string;
    selected: boolean;
};

export interface Props {
    //
}

const FormulaContent = (props: Props) => {
    const [formulaData, setFormulaData] = useState([
        {
            id: 1,
            name: 'Cleanser',
            options: [
                {
                    id: 11,
                    name: 'key ingredients',
                    options: [
                        {
                            id: 111,
                            type: 'ingredient',
                            name: 'Niacinamide',
                            selected: false,
                            defaultSelected: false,
                            description: `
                                    <p>A multi-functional skincare superstar with several proven benefits for the skin</p>
                                    <p>Great anti-aging, wrinkle smoothing ingredient used at 4-5% concentration</p>
                                    <p>Fades brown spots alone or in combination with amino sugar, acetyl glucosamine</p>
                                    <p>Increases ceramide synthesis that results in a stronger, healthier skin barrier and better skin hydration</p>
                                    <p>Can help to improve several skin conditions including acne, rosacea, and atopic dermatitis</p>
                                `,
                            formulaImg: {
                                url: '/upload/formula.png',
                                width: 224,
                                height: 136,
                            },
                            rarity: 'rare',
                            reasons: ['vegan', 'anti-acne', 'anti-inflamatory', 'moisturizer'],
                        },
                        {
                            id: 112,
                            type: 'ingredient',
                            name: 'Ascorbic Acid',
                            selected: false,
                            defaultSelected: false,
                            description: `
                                    <p>A multi-functional skincare superstar with several proven benefits for the skin</p>
                                    <p>Great anti-aging, wrinkle smoothing ingredient used at 4-5% concentration</p>
                                    <p>Fades brown spots alone or in combination with amino sugar, acetyl glucosamine</p>
                                    <p>Increases ceramide synthesis that results in a stronger, healthier skin barrier and better skin hydration</p>
                                `,
                            formulaImg: {
                                url: '/upload/formula.png',
                                width: 224,
                                height: 136,
                            },
                            rarity: 'ultra-rare',
                            reasons: ['vegan', 'anti-acne', 'anti-inflamatory', 'moisturizer'],
                        },
                        {
                            id: 113,
                            type: 'ingredient',
                            name: 'Citric Acid',
                            selected: false,
                            defaultSelected: false,
                            description: `
                                    <p>A multi-functional skincare superstar with several proven benefits for the skin</p>
                                    <p>Great anti-aging, wrinkle smoothing ingredient used at 4-5% concentration</p>
                                    <p>Fades brown spots alone or in combination with amino sugar, acetyl glucosamine</p>
                                    <p>Increases ceramide synthesis that results in a stronger, healthier skin barrier and better skin hydration</p>
                                    <p>Can help to improve several skin conditions including acne, rosacea, and atopic dermatitis</p>
                                `,
                            formulaImg: {
                                url: '/upload/formula.png',
                                width: 224,
                                height: 136,
                            },
                            rarity: 'rare',
                            reasons: ['vegan', 'anti-acne', 'anti-inflamatory', 'moisturizer'],
                        },
                    ],
                },
                {
                    id: 12,
                    name: 'consistancy',
                },
                {
                    id: 13,
                    name: 'fragrance',
                    options: [
                        {
                            id: 131,
                            name: 'natural',
                            default: 1312,
                            list: [
                                {
                                    id: 1311,
                                    name: 'Tea Tree Oil',
                                    selected: false,
                                    defaultSelected: false,
                                    description:
                                        'Comes from the leaves of Melaleuca alternifolia, a small tree native to Queensland and New South Wales, Australia',
                                },
                                {
                                    id: 1312,
                                    name: 'Almond',
                                    selected: true,
                                    defaultSelected: true,
                                    description:
                                        'Comes from the leaves of Melaleuca alternifolia, a small tree native to Queensland and New South Wales, Australia',
                                },
                                {
                                    id: 1313,
                                    name: 'Vanilla',
                                    selected: false,
                                    defaultSelected: false,
                                    description:
                                        'Comes from the leaves of Melaleuca alternifolia, a small tree native to Queensland and New South Wales, Australia',
                                },
                                {
                                    id: 1314,
                                    name: 'Lavender',
                                    selected: false,
                                    defaultSelected: false,
                                    description:
                                        'Comes from the leaves of Melaleuca alternifolia, a small tree native to Queensland and New South Wales, Australia',
                                },
                                {
                                    id: 1315,
                                    name: 'Cucumber',
                                    selected: false,
                                    defaultSelected: false,
                                    description:
                                        'Comes from the leaves of Melaleuca alternifolia, a small tree native to Queensland and New South Wales, Australia',
                                },
                                {
                                    id: 1316,
                                    name: 'Saffron',
                                    selected: false,
                                    defaultSelected: false,
                                    description:
                                        'Comes from the leaves of Melaleuca alternifolia, a small tree native to Queensland and New South Wales, Australia',
                                },
                                {
                                    id: 1317,
                                    name: 'Melon',
                                    selected: false,
                                    defaultSelected: false,
                                    description:
                                        'Comes from the leaves of Melaleuca alternifolia, a small tree native to Queensland and New South Wales, Australia',
                                },
                            ],
                        },
                        {
                            id: 132,
                            name: 'synthetic',
                        },
                        {
                            id: 133,
                            name: 'fragrance-free',
                        },
                    ],
                },
                {
                    id: 14,
                    name: 'base',
                },
            ],
        },
        {
            id: 2,
            name: 'Mosturiser',
            selected: false,
        },
        {
            id: 3,
            name: 'Dark circles serum',
            selected: false,
        },
        {
            id: 4,
            name: 'Anti wrinkle serum',
            selected: false,
        },
        {
            id: 5,
            name: 'serum',
            selected: false,
        },
    ]);

    const [pickerPathStrings, setPickerPathStrings] = useState<string[]>([]);
    const [activeOption, setActiveOption] = useState<PickerOption | null>(null);
    const [renderedOption, setRenderedActiveOption] = useState<PickerOption | null>(activeOption);

    const findSelectedOption = (source: any[]) => {
        const findOpt = (obj: Record<string, any>) => {
            const options = obj.options || obj.list;
            if (options && options.length > 0) {
                for (let i = 0; i < options.length; i++) {
                    const _option = findOpt(options[i]);
                    if (_option) {
                        return _option;
                    }
                }
            } else if (obj.selected) {
                return obj;
            }
        };

        for (let i = 0; i < source.length; i++) {
            const _option = findOpt(source[i]);
            if (_option) {
                return _option;
            }
        }
    };

    const findCurrentOption = (source: any[], id: number) => {
        const findCurrentOpt = (obj: Record<string, any>) => {
            const options = obj.options || obj.list;
            if (options?.length > 0) {
                for (let i = 0; i < options.length; i++) {
                    const _option = findCurrentOpt(options[i]);
                    if (_option) {
                        return _option;
                    }
                }
            } else if (obj.id === id) {
                return obj;
            }
        };

        for (let i = 0; i < source.length; i++) {
            const _option = findCurrentOpt(source[i]);
            if (_option) {
                return _option;
            }
        }
    };

    const selectSuggestion = (suggestion: FormulaSuggestion) => {
        setFormulaData(
            produce(formulaData, (draftState) => {
                const selectedOption = findSelectedOption(draftState);
                if (selectedOption) {
                    selectedOption.selected = false;
                }

                const currentOption = findCurrentOption(draftState, suggestion.id);
                if (currentOption) {
                    currentOption.selected = true;
                }
            }),
        );
    };

    const deselectSuggestion = (suggestion: FormulaSuggestion) => {
        setFormulaData(
            produce(formulaData, (draftState) => {
                const selectedOption = findSelectedOption(draftState);
                if (selectedOption) {
                    selectedOption.selected = false;
                }
            }),
        );
    };

    const select = (suggestion: FormulaSuggestion) => {
        const isSelected = findCurrentOption(formulaData, suggestion.id)?.selected;
        if (isSelected) {
            deselectSuggestion(suggestion);
        } else {
            selectSuggestion(suggestion);
        }
    };

    const reset = () => {
        setFormulaData(
            produce(formulaData, (draftState) => {
                const findOptWithDefaultSelected = (obj: Record<string, any>) => {
                    const options = obj.options || obj.list;
                    if (options && options.length > 0) {
                        for (let i = 0; i < options.length; i++) {
                            findOptWithDefaultSelected(options[i]);
                        }
                    } else if (typeof obj.defaultSelected === 'boolean') {
                        obj.selected = obj.defaultSelected;
                    }
                };

                draftState.forEach((el) => {
                    findOptWithDefaultSelected(el);
                });
            }),
        );
    };

    useEffect(() => {
        const timeout = setTimeout(
            () => {
                setRenderedActiveOption(activeOption);
            },
            activeOption ? 0 : 1000,
        );

        return () => clearTimeout(timeout);
    }, [activeOption]);

    return (
        <div className="formula-content">
            <div
                className={classNames('curtain-reveal-element formula-info-card js-curtain-reveal-element', {
                    'is-revealed': !!activeOption,
                })}
            >
                {renderedOption && renderedOption.type !== 'ingredient' && (
                    <FormulaFragnanceCard
                        formulaData={formulaData}
                        activeOption={renderedOption}
                        findCurrentOption={findCurrentOption}
                        select={select}
                        reset={reset}
                    />
                )}

                {renderedOption && renderedOption.type === 'ingredient' && (
                    <FormulaIngredientCard
                        formulaData={formulaData}
                        activeOption={renderedOption}
                        findCurrentOption={findCurrentOption}
                        select={select}
                        reset={reset}
                    />
                )}
            </div>

            <FormulaNestedPicker
                // distribution={
                //     mediaQueryDevice === 'vertical-tablet' || mediaQueryDevice.includes('mobile')
                //         ? 'bottom'
                //         : 'right'
                // }
                distribution="center"
                middleText="Choose product"
                options={formulaData}
                onDeepLevelChange={(deepIndex /* , pickerOption */) => {
                    setActiveOption(null);

                    // setPickerPathStrings(
                    //     produce(pickerPathStrings, (draftState) => {
                    //         // draftState[deepIndex] = pickerOption.name;
                    //         draftState[deepIndex] = 'ss';
                    //     }),
                    // );
                }}
                onPick={(pickerOption) => {
                    setActiveOption(pickerOption);
                    // setActiveIngredientOption(null);
                    // setActiveFragranceOption(null);

                    // if (pickerOption.type === 'ingredient') {
                    //     setActiveIngredientOption(pickerOption);
                    // } else {
                    //     setActiveFragranceOption(pickerOption);
                    // }
                }}
                className="formula-picker"
            />
        </div>
    );
};

export default FormulaContent;
