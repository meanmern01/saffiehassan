import styles from './FormulaFragnanceCard.module.scss';
import { HTMLAttributes } from 'react';
import classNames from 'classnames';
import Tooltip from '@/components/shared/Tooltip';
import SquareButton from '@/components/shared/SquareButton';
import QuestionMarkSVG from '@/svg/question-mark.svg';
import Button from '@/components/shared/Button';
import FormulaBreadcrumbsBlock from '../FormulaBreadcrumbsBlock';

export interface Props extends HTMLAttributes<HTMLElement> {
    formulaData: any;
    activeOption: any;
    findCurrentOption: any;
    select: any;
    reset: any;
}

const FormulaFragnanceCard = ({ formulaData, activeOption, findCurrentOption, select, reset, ...props }: Props) => {
    return (
        <div {...props}>
            <FormulaBreadcrumbsBlock breadcrumbs={['fragnance', activeOption.name]}>
                <ul className="list-unstyled square-pickable__list">
                    {Array.isArray(activeOption.list) &&
                        activeOption.list.map((el) => (
                            <li key={el.id} className="square-pickable__list-item">
                                <button
                                    className={classNames('square-pickable__item', {
                                        'square-pickable__item--selected': findCurrentOption(formulaData, el.id)
                                            ?.selected,
                                    })}
                                    onClick={() => select(el)}
                                >
                                    <span>{el.name}</span>
                                </button>
                                {el.description && (
                                    <Tooltip
                                        label={
                                            <div>
                                                <div className="text-caption formula-info-card__tooltip-label">
                                                    information on
                                                </div>
                                                <div className="subhead">{el.name}</div>
                                                <div className="formula-info-card__tooltip__text">
                                                    <p>{el.description}</p>
                                                </div>
                                            </div>
                                        }
                                        offset={10}
                                        placement="bottom-start"
                                        shift={8}
                                        className="formula-info-card__tooltip"
                                    >
                                        <SquareButton
                                            className="formula__square-btn square-pickable__item-more-info-btn"
                                            aria-label="More info"
                                        >
                                            <QuestionMarkSVG />
                                        </SquareButton>
                                    </Tooltip>
                                )}
                            </li>
                        ))}
                </ul>
            </FormulaBreadcrumbsBlock>
            <div className="formula-info-card__bottom">
                <Button variant="outline-dark" onClick={reset}>
                    Reset
                </Button>
                <Button variant="outline-dark">Confirm</Button>
            </div>
        </div>
    );
};

export default FormulaFragnanceCard;
