import { notifications } from '@mantine/notifications';
import classes from './notifications.module.css';

interface NotificationProps {
    message?: string;
    title: string;
}

export const showErrorNotification = ({ message = "", title }: NotificationProps) => {
    notifications.show({
        color: 'red',
        title: title,
        message: message,
        classNames: classes, 
    });
};

export const showNotification = ({ message = "", title }: NotificationProps) => {
    notifications.show({
        title: title,
        message: message,
        classNames: classes,
    });
};