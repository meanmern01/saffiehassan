import styles from './RenderingError.module.scss';
import React from 'react';

export interface Props {
    /**
     * Сообщение
     */
    message?: string;
}

const RenderingError = ({ message }: Props) => {
    return (
        <div className={styles.container}>
            {message && <div className={styles.message}>{message}</div>}
        </div>
    );
};

export default RenderingError;
