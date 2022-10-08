import styles from './SkinTypeInfo.module.scss';
import { HTMLAttributes, useEffect, useState } from 'react';
import AnalysisCurtainBlock from '../../AnalysisCurtainBlock';
import Diagram from '../../Diagram';
import classNames from 'classnames';

type Props = HTMLAttributes<HTMLElement> & {
    description?: string;
    percent?: number;
    title: string;
    revealed?: boolean;
};

const SkinTypeInfo = ({ description, percent, title, revealed = false, ...props }: Props) => {
    return (
        <div {...props}>
            {percent && (
                <AnalysisCurtainBlock
                    title="A.I. Confidence"
                    bottomSlot={<Diagram percent={percent} className={styles.diagram} />}
                    className={styles.block}
                    revealed={revealed}
                />
            )}
            <AnalysisCurtainBlock
                title="Your result"
                className={classNames(styles.block, styles['result-block'])}
                bottomSlot={
                    <div className={styles.content}>
                        <div className={classNames('h4', styles.title)}>{title}</div>
                        {description && <div>{description}</div>}
                    </div>
                }
                bottomSlotFullWidth={true}
                revealed={revealed}
            />
        </div>
    );
};

export default SkinTypeInfo;
