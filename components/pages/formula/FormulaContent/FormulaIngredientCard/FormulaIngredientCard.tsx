import { HTMLAttributes, useEffect, useState } from 'react';
import Image from 'next/future/image';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import SquareButton from '@/components/shared/SquareButton';
import QuestionMarkSVG from '@/svg/question-mark.svg';
import Button from '@/components/shared/Button';
import AppMessage from '@/components/shared/AppMessage';
import ActionWithConfirmation from '@/components/shared/ActionWithConfirmation';
import FormulaIngredientInfoBlock from '../../FormulaIngredientInfoBlock';
import FormulaSwap from '../../FormulaSwap';
import { usePrevious } from '@/hooks/use-previous';

export interface Props extends HTMLAttributes<HTMLElement> {
    formulaData: any[];
    activeOption: any;
    findCurrentOption: any;
    select: any;
    reset: any;
}

const FormulaIngredientCard = ({ formulaData, activeOption, findCurrentOption, select, reset, ...props }: Props) => {
    const [swapPopupOpen, setSwapPopupOpen] = useState(false);
    const prevActiveOption = usePrevious<any>(activeOption);

    useEffect(() => {
        if (!activeOption || (prevActiveOption && activeOption.id !== prevActiveOption.id)) {
            setSwapPopupOpen(false);
        }
    }, [activeOption, prevActiveOption]);

    return (
        <div {...props} className={classNames('formula-ingredient-card', props.className)}>
            {swapPopupOpen ? (
                <FormulaSwap className="formula-ingredient-card__el" />
            ) : (
                <div className="formula-ingredient-card__el">
                    <div className="formula-ingredient-card-block">
                        <div className="h4 formula-ingredient-card-block__title">{activeOption.name}</div>
                    </div>
                    <div className="formula-ingredient-card-block">
                        <div className="formula-ingredient-card-block__top">
                            <div className="subhead formula-ingredient-card-block__title">Formula</div>
                        </div>
                        {activeOption.formulaImg?.url && (
                            <div className="formula-ingredient-card-block__img">
                                <Image
                                    src={activeOption.formulaImg.url}
                                    width={activeOption.formulaImg.width ?? 0}
                                    height={activeOption.formulaImg.height ?? 0}
                                    alt=""
                                    className="img-fluid"
                                />
                            </div>
                        )}
                    </div>
                    <div className="formula-ingredient-card-block">
                        <div className="formula-ingredient-card-block__top">
                            {activeOption.rarity && (
                                <div className="subhead formula-ingredient-card-block__title">
                                    {activeOption.rarity}
                                </div>
                            )}
                            {activeOption.description && (
                                <div className="formula-ingredient-card-block__square-btn-wrapper">
                                    <SquareButton
                                        className="formula__square-btn formula-ingredient-card-block__square-btn"
                                        aria-label="More info"
                                    >
                                        <QuestionMarkSVG />
                                    </SquareButton>
                                    <div className="formula-ingredient-card-block__info">
                                        <AppMessage
                                            visible
                                            text={activeOption.description}
                                            actionsSlot={<Button variant="dark">Learn more</Button>}
                                        >
                                            {activeOption.name}
                                        </AppMessage>
                                    </div>
                                </div>
                            )}
                        </div>
                        {Array.isArray(activeOption.reasons) && activeOption.reasons.length > 0 && (
                            <div>
                                <div className="formula-ingredient-card-block__reasons-title">Was added because</div>
                                <div className="formula-ingredient-card-block__reasons-list-wrapper">
                                    <ul className="list-unstyled formula-ingredient-card-block__reasons-list">
                                        {activeOption.reasons.map((reason, i) => (
                                            <li key={i} className="formula-ingredient-card-block__reasons-list__item">
                                                <div className="formula-ingredient-card-block__reason">{reason}</div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className="formula-info-card__bottom">
                {/* <CSSTransition
                    in={Boolean(findCurrentOption(formulaData, activeOption.id)?.selected)}
                    mountOnEnter
                    unmountOnExit
                    timeout={700}
                    classNames="formula-info-card__action"
                > */}
                {Boolean(findCurrentOption(formulaData, activeOption.id)?.selected) && (
                    <Button
                        variant={swapPopupOpen ? 'dark' : 'outline-dark'}
                        onClick={() => setSwapPopupOpen(!swapPopupOpen)}
                    >
                        Swap
                    </Button>
                )}
                {/* </CSSTransition> */}

                <Button
                    variant="outline-dark"
                    onClick={() => {
                        reset();
                        setSwapPopupOpen(false);
                    }}
                >
                    Reset
                </Button>

                <ActionWithConfirmation
                    placement="top-start"
                    popupTitle="Are you sure you want to remove this ingredient?"
                    popupContent={
                        <FormulaIngredientInfoBlock
                            title={activeOption.name}
                            text="vitamin B3, nicotinamide"
                            className="formula-info-card__action-confirmation-popup-content"
                        />
                    }
                    popupActionsSlot={
                        <>
                            <Button variant="dark" data-confirmation="accept">
                                Remove
                            </Button>
                            <Button variant="dark" data-confirmation="cancel">
                                Keep
                            </Button>
                        </>
                    }
                    onConfirm={() => {
                        select(activeOption);
                        setSwapPopupOpen(false);
                    }}
                    containerProps={{
                        className: classNames({
                            'formula-info-card__action--hidden': !Boolean(
                                findCurrentOption(formulaData, activeOption.id)?.selected,
                            ),
                        }),
                    }}
                >
                    <Button
                        variant="outline-dark"
                        className={classNames({
                            'visually-hidden': !Boolean(findCurrentOption(formulaData, activeOption.id)?.selected),
                        })}
                        aria-hidden={!Boolean(findCurrentOption(formulaData, activeOption.id)?.selected)}
                        tabIndex={findCurrentOption(formulaData, activeOption.id)?.selected ? 0 : -1}
                    >
                        Remove
                    </Button>
                </ActionWithConfirmation>

                {!Boolean(findCurrentOption(formulaData, activeOption.id)?.selected) && (
                    <Button variant="outline-dark" onClick={() => select(activeOption)}>
                        Add
                    </Button>
                )}
            </div>
        </div>
    );
};

export default FormulaIngredientCard;
