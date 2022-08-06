import React from 'react';
import NotificationDisplay from './Notification';
import { NotificationsApi, Notification } from 'api';
import { useAuthContext } from 'utility/hooks/useAuth';

const NotificationsPage = () => {
  const [notifications, setNotifications] = React.useState<Notification[]>([]);
  //   const [hideRead, setHideRead] = React.useState<boolean>(false);
  const { token } = useAuthContext();

  React.useEffect(() => {
    (async () => {
      const api = new NotificationsApi({ apiKey: token });
      const result = await api.apiNotificationsGet();
      const NewNotifications = result.data;
      NewNotifications && setNotifications([...notifications, ...NewNotifications]);
    })();

    // Temp test with local data
  }, []);

  return (
    <>
      {/* <Box style={{ cursor: 'pointer' }}>
        <Button onClick={() => setHideRead(false)}>All</Button>
        <Button onClick={() => setHideRead(true)}>Unread</Button>
      </Box> */}

      {notifications.map((n) => (
        <NotificationDisplay key={`notification-${n.id}`} notification={n} />
      ))}
    </>
  );
};

export default NotificationsPage;
