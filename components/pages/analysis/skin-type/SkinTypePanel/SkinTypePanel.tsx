import styles from './SkinTypePanel.module.scss';
import { HTMLAttributes, useState } from 'react';
import classNames from 'classnames';
import Button from '@/components/shared/Button';
import SkinTypeInfo from '../SkinTypeInfo';

export interface Props extends HTMLAttributes<HTMLElement> {
    data: any;
    objectKey: string;
    findDefaultOption: any;
    revealed?: boolean;
}

const SkinTypePanel = ({ children, data, objectKey, findDefaultOption, revealed = false, ...props }: Props) => {
    const [open, setOpen] = useState(false);

    return (
        <div {...props} className={classNames(styles.panel, props.className)}>
            <div className={classNames(styles['panel-left'], { [styles['panel-left--open']]: open })}>
                <div className={styles['panel-left__inner']}>
                    {children}
                    <Button
                        variant="dark"
                        geometryVariant="wide"
                        className={styles['panel-left-button']}
                        onClick={() => setOpen(false)}
                    >
                        Back
                    </Button>
                </div>
            </div>
            <div className={styles['panel-right']}>
                <SkinTypeInfo
                    percent={findDefaultOption(data, objectKey)?.accuracy}
                    title={findDefaultOption(data, objectKey)?.name}
                    description={findDefaultOption(data, objectKey)?.description}
                    revealed={revealed}
                />
                <Button
                    variant="dark"
                    geometryVariant="wide"
                    className={styles['panel-left-button']}
                    onClick={() => setOpen(true)}
                >
                    Edit if incorrect
                </Button>
            </div>
        </div>
    );
};

export default SkinTypePanel;
