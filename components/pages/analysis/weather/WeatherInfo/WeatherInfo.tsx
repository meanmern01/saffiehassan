import styles from './WeatherInfo.module.scss';
import classNames from 'classnames';
import { HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLElement> & {
    primaryText?: string;
    secondaryText?: string;
};

const WeatherInfo = ({ primaryText, secondaryText, ...props }: Props) => {
    return (
        <div {...props} className={classNames(styles.container, props.className)}>
            {primaryText && <div className={styles.primary}>{primaryText}</div>}
            {secondaryText && (
                <div className={styles.secondary}>
                    <span className={styles['secondary-content']}>{secondaryText}</span>
                </div>
            )}
        </div>
    );
};

export default WeatherInfo;
