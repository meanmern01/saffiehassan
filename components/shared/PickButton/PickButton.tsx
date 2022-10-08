import styles from './PickButton.module.scss';
import { HTMLAttributes } from 'react';
import classNames from 'classnames';

type Props = HTMLAttributes<HTMLButtonElement> & {
    active?: boolean;
    category?: string;
    title?: string;
};

const PickButton = ({ active = false, title, category, children, ...props }: Props) => {
    return (
        <button
            {...props}
            className={classNames('subhead', styles.button, props.className, { [styles.active]: active })}
        >
            <span className={styles.line}>
                {title && <span className={styles.title}>{title}</span>}
                {category && <span className={styles.category}>{category}</span>}
            </span>
            {children}
        </button>
    );
};

export default PickButton;
