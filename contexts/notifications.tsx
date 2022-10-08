import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export interface AppNotification {
    id: number;
    isError?: boolean;
    message: string;
}

interface NotificationsProvide {
    notifications: AppNotification[];
    pushNotification: (text: string, isError?: boolean) => void;
    removeNotification: (notificationId: number) => void;
    getLeaveTimeout: (id: number) => number | undefined;
    setLeaveTimeout: (id: number, timeout: number) => void;
}

const noop = () => {};

let id = 0;

const NotificationsContext = createContext<NotificationsProvide>({
    notifications: [],
    pushNotification: noop,
    removeNotification: noop,
    getLeaveTimeout: () => undefined,
    setLeaveTimeout: noop,
});

export const useProvideNotifications = (): NotificationsProvide => {
    const [notifications, setNotifications] = useState<AppNotification[]>([]);
    const map = useMemo(() => new Map<number, number>(), []);

    const pushNotification = (text: string, isError?: boolean) =>
        setNotifications([...notifications, { id: id++, message: text, isError: !!isError }]);

    const removeNotification = useCallback(
        (notificationId: number) =>
            setNotifications(notifications.filter((notification) => notification.id !== notificationId)),
        [notifications],
    );

    const setLeaveTimeout = (id: number, timeout: number) => map.set(id, timeout);

    const getLeaveTimeout = (id: number) => map.get(id);

    return { notifications, pushNotification, removeNotification, getLeaveTimeout, setLeaveTimeout };
};

export const NotificationsContextProvider = ({ children }: { children: ReactNode }) => {
    const value = useProvideNotifications();
    return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>;
};

export const useNotificationsContext = () => useContext(NotificationsContext);
