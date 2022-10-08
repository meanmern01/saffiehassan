/**
 * Система нотификаций
 */

import styles from './Notifications.module.scss';
import classNames from 'classnames';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useNotificationsContext } from '@/contexts/notifications';
import Notification from './Notification/Notification';

const Notifications = () => {
    const { notifications } = useNotificationsContext();

    return (
        <TransitionGroup component="ul" className={classNames('list-unstyled text-sm', styles.list)}>
            {notifications.map((notification) => (
                <CSSTransition key={notification.id} in={false} timeout={300} classNames="fade">
                    <li key={notification.id} className={styles.item}>
                        <Notification {...notification} />
                    </li>
                </CSSTransition>
            ))}
        </TransitionGroup>
    );
};

export default Notifications;
