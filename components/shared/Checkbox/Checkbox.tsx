import styles from './Checkbox.module.scss';
import { forwardRef, InputHTMLAttributes } from 'react';
import classNames from 'classnames';

const Checkbox = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
    ({ children, type = 'checkbox', ...props }, ref) => {
        return (
            <label className={classNames(styles.checkbox, props.className)}>
                <input {...props} ref={ref} type={type} className="visually-hidden" />
                <span className={styles.element}></span>
                <span className={styles.text}>{children}</span>
            </label>
        );
    },
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
