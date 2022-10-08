import styles from './FormulaSwap.module.scss';
import FormulaIngredientInfoBlock from '../FormulaIngredientInfoBlock';
import { HTMLAttributes, useState } from 'react';
import Image from 'next/future/image';
import classNames from 'classnames';
import FormulaBreadcrumbsBlock from '../FormulaBreadcrumbsBlock';
import Button from '@/components/shared/Button';

export interface Props extends HTMLAttributes<HTMLElement> {
    //
}

const FormulaSwap = ({ ...props }: Props) => {
    const [isContentShown, setIsContentShown] = useState(false);

    const showContent = () => {
        setIsContentShown(true);
        console.log('TODO');
    };

    const swap = () => {
        setIsContentShown(false);
    };

    return (
        <div {...props} className={classNames('formula-ingredient-card', props.className)}>
            {isContentShown ? (
                <FormulaBreadcrumbsBlock
                    breadcrumbs={['Swap with', 'common', 'Bakuchiol Extract']}
                    className="formula-ingredient-card__swap"
                >
                    <div className="formula-ingredient-card__swap-content">
                        <div className="formula-ingredient-card__swap-content__top">
                            <div className="subhead formula-ingredient-card__swap-content__top-title">
                                Bakuchiol Extract
                            </div>
                            <div className="formula-ingredient-card__swap-content__top-secondary">
                                Psoralea corylifolia
                            </div>
                        </div>

                        <div className="formula-ingredient-card__swap-content__main">
                            <Image
                                src="/upload/formula-2.png"
                                width={306 * 2}
                                height={152 * 2}
                                className="img-fluid formula-ingredient-card__swap-content__img"
                                alt=""
                            />

                            <p>
                                Babchi Seed Carrier Oil (India) is used in Ayurveda as a Carrier Oil for treating
                                dermatological conditions of Leucoderma and other disorders of the skins. Babchi Seed
                                Carrier Oil (India) is used in Ayurveda as a Carrier Oil for treating dermatological
                                conditions of Leucoderma and...
                            </p>
                            <p>
                                Babchi Seed Carrier Oil (India) is used in Ayurveda as a Carrier Oil for treating
                                dermatological conditions of Leucoderma and other disorders of the skins. Babchi Seed
                                Carrier Oil (India) is used in Ayurveda as a Carrier Oil for treating dermatological
                                conditions of Leucoderma and...
                            </p>
                            <p>
                                Babchi Seed Carrier Oil (India) is used in Ayurveda as a Carrier Oil for treating
                                dermatological conditions of Leucoderma and other disorders of the skins. Babchi Seed
                                Carrier Oil (India) is used in Ayurveda as a Carrier Oil for treating dermatological
                                conditions of Leucoderma and...
                            </p>
                            <p>
                                Babchi Seed Carrier Oil (India) is used in Ayurveda as a Carrier Oil for treating
                                dermatological conditions of Leucoderma and other disorders of the skins. Babchi Seed
                                Carrier Oil (India) is used in Ayurveda as a Carrier Oil for treating dermatological
                                conditions of Leucoderma and...
                            </p>
                            <p>
                                Babchi Seed Carrier Oil (India) is used in Ayurveda as a Carrier Oil for treating
                                dermatological conditions of Leucoderma and other disorders of the skins. Babchi Seed
                                Carrier Oil (India) is used in Ayurveda as a Carrier Oil for treating dermatological
                                conditions of Leucoderma and...
                            </p>
                            <p>
                                Babchi Seed Carrier Oil (India) is used in Ayurveda as a Carrier Oil for treating
                                dermatological conditions of Leucoderma and other disorders of the skins. Babchi Seed
                                Carrier Oil (India) is used in Ayurveda as a Carrier Oil for treating dermatological
                                conditions of Leucoderma and...
                            </p>
                            <p>
                                Babchi Seed Carrier Oil (India) is used in Ayurveda as a Carrier Oil for treating
                                dermatological conditions of Leucoderma and other disorders of the skins. Babchi Seed
                                Carrier Oil (India) is used in Ayurveda as a Carrier Oil for treating dermatological
                                conditions of Leucoderma and...
                            </p>
                            <p>
                                Babchi Seed Carrier Oil (India) is used in Ayurveda as a Carrier Oil for treating
                                dermatological conditions of Leucoderma and other disorders of the skins. Babchi Seed
                                Carrier Oil (India) is used in Ayurveda as a Carrier Oil for treating dermatological
                                conditions of Leucoderma and...
                            </p>
                            <p>
                                Babchi Seed Carrier Oil (India) is used in Ayurveda as a Carrier Oil for treating
                                dermatological conditions of Leucoderma and other disorders of the skins. Babchi Seed
                                Carrier Oil (India) is used in Ayurveda as a Carrier Oil for treating dermatological
                                conditions of Leucoderma and...
                            </p>
                            <p>
                                Babchi Seed Carrier Oil (India) is used in Ayurveda as a Carrier Oil for treating
                                dermatological conditions of Leucoderma and other disorders of the skins. Babchi Seed
                                Carrier Oil (India) is used in Ayurveda as a Carrier Oil for treating dermatological
                                conditions of Leucoderma and...
                            </p>
                            <p>
                                Babchi Seed Carrier Oil (India) is used in Ayurveda as a Carrier Oil for treating
                                dermatological conditions of Leucoderma and other disorders of the skins. Babchi Seed
                                Carrier Oil (India) is used in Ayurveda as a Carrier Oil for treating dermatological
                                conditions of Leucoderma and...
                            </p>
                            <p>
                                Babchi Seed Carrier Oil (India) is used in Ayurveda as a Carrier Oil for treating
                                dermatological conditions of Leucoderma and other disorders of the skins. Babchi Seed
                                Carrier Oil (India) is used in Ayurveda as a Carrier Oil for treating dermatological
                                conditions of Leucoderma and...
                            </p>
                        </div>
                    </div>
                    <div className="formula-ingredient-card__swap-bottom">
                        <Button variant="dark" onClick={swap}>
                            Select
                        </Button>
                    </div>
                </FormulaBreadcrumbsBlock>
            ) : (
                <FormulaBreadcrumbsBlock breadcrumbs={['Swap with']} className="formula-ingredient-card__swap">
                    <ul className="list-unstyled formula-ingredient-card__swap-list">
                        <li className="formula-ingredient-card__swap-list__item">
                            <button className="formula-ingredient-card__swap-item" onClick={showContent}>
                                <FormulaIngredientInfoBlock title="Common" text="usual ingredients" />
                            </button>
                        </li>
                        <li className="formula-ingredient-card__swap-list__item">
                            <button className="formula-ingredient-card__swap-item" onClick={showContent}>
                                <FormulaIngredientInfoBlock title="Rare" text="hard to obtain" />
                            </button>
                        </li>
                        <li className="formula-ingredient-card__swap-list__item">
                            <button className="formula-ingredient-card__swap-item" onClick={showContent}>
                                <FormulaIngredientInfoBlock title="Ultra rare" text="ultra hard to obtain" />
                            </button>
                        </li>
                    </ul>
                </FormulaBreadcrumbsBlock>
            )}
        </div>
    );
};

export default FormulaSwap;
