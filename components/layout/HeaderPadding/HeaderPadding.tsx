import styles from './HeaderPadding.module.scss';
import classNames from 'classnames';
import { HTMLAttributes } from 'react';

const HeaderPadding = (props: HTMLAttributes<HTMLElement>) => {
    return <div {...props} className={classNames(styles.container, props.className)}></div>;
};

export default HeaderPadding;
