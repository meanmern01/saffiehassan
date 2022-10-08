import classNames from 'classnames';
import { HTMLAttributes, ReactNode } from 'react';
import styles from './BottomNav.module.scss';

type Props = HTMLAttributes<HTMLElement> & {
    leftSlot?: ReactNode;
    middleSlot?: ReactNode;
    rightSlot?: ReactNode;
    fixed?: boolean;
};

const BottomNav = ({ fixed = false, leftSlot, middleSlot, rightSlot, ...props }: Props) => {
    return (
        <div {...props} className={classNames(styles.container, props.className, { [styles.fixed]: fixed })}>
            {leftSlot && <div className={styles.left}>{leftSlot}</div>}
            {middleSlot && <div className={styles.middle}>{middleSlot}</div>}
            {rightSlot && <div className={styles.right}>{rightSlot}</div>}
        </div>
    );
};

export default BottomNav;
