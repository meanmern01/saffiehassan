import styles from './FormulaIngredientInfoBlock.module.scss';
import classNames from 'classnames';
import { HTMLAttributes } from 'react';

export interface Props extends HTMLAttributes<HTMLElement> {
    title?: string;
    text?: string;
}

const FormulaIngredientInfoBlock = ({ title, text, ...props }: Props) => {
    return (
        <span {...props} className={classNames(styles.content, props.className)}>
            <span className={classNames('h4', styles.title)}>{title}</span>
            <span className={styles.text}>{text}</span>
        </span>
    );
};

export default FormulaIngredientInfoBlock;
