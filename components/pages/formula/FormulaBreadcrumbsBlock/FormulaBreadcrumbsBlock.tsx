import styles from './FormulaBreadcrumbsBlock.module.scss';
import { HTMLAttributes } from 'react';
import classNames from 'classnames';

export interface Props extends HTMLAttributes<HTMLElement> {
    breadcrumbs?: string[];
}

const FormulaBreadcrumbsBlock = ({ children, breadcrumbs = [], ...props }: Props) => {
    return (
        <div {...props} className={classNames(styles.container, props.className)}>
            {breadcrumbs.length > 0 && (
                <div className={styles.top}>
                    {breadcrumbs.map((breadcrumb, i) => (
                        <div key={i} className={classNames('subhead', styles['top-el'])}>
                            {breadcrumb}
                        </div>
                    ))}
                </div>
            )}
            <div className={styles.content}>{children}</div>
        </div>
    );
};

export default FormulaBreadcrumbsBlock;
