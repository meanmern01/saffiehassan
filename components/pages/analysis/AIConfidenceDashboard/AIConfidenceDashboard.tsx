import classNames from 'classnames';
import { HTMLAttributes } from 'react';
import styles from './AIConfidenceDashboard.module.scss';
import Diagram from '../Diagram';

type Props = HTMLAttributes<HTMLElement> & {
    percent: number;
};

const AIConfidenceDashboard = ({ percent, ...props }: Props) => {
    return (
        <div {...props} className={classNames(styles.container, props.className)}>
            <div className={classNames('subhead', styles.title)}>A.I. confidence</div>
            <Diagram percent={percent} className={classNames('ai-condifence-dashboard__diagram', styles.diagram)} />
        </div>
    );
};

export default AIConfidenceDashboard;
