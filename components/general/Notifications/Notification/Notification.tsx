import styles from './Notification.module.scss';
import { useEffect } from 'react';
import classNames from 'classnames';
import { AppNotification, useNotificationsContext } from '@/contexts/notifications';
// import CrossSVG from 'svg/cross.svg';

interface Props extends AppNotification {}

const Notification = ({ id, isError, message }: Props) => {
    const { removeNotification, setLeaveTimeout, getLeaveTimeout } = useNotificationsContext();

    useEffect(() => {
        const startTime = performance.now();

        const timer = setTimeout(() => {
            removeNotification(id);
        }, getLeaveTimeout(id) ?? 5000);

        return () => {
            setLeaveTimeout(id, 5000 - (performance.now() - startTime));
            clearTimeout(timer);
        };
    }, [id, removeNotification, setLeaveTimeout, getLeaveTimeout]);

    return (
        <div className={classNames(styles.notification, { [styles['is-error']]: isError })}>
            <span>{message}</span>
            <button className={styles.btn} onClick={() => removeNotification(id)} aria-label="Remove notification">
                {/* <CrossSVG /> */}
            </button>
        </div>
    );
};

export default Notification;
