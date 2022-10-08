import classNames from 'classnames';
import { HTMLAttributes } from 'react';
import styles from './Loader.module.scss';

const Loader = (props: HTMLAttributes<HTMLElement>) => {
    return <div {...props} className={classNames('loader', styles.loader, props.className)}></div>;
};

export default Loader;
