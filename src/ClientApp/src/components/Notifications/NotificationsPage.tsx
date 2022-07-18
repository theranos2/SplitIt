import React from 'react';
import { Box, Button, Container } from '@mui/material';
import { request } from 'utility/api/api';
import data from './data.json';
import NotificationDisplay from './Notification';
import { NotificationsApi } from 'api';
import { Notification } from 'api';

import { token } from 'utility/config';

const NotificationsPage = () => {
  const [notifications, setNotifications] = React.useState<Notification[]>([]);

  React.useEffect(() => {
    (async () => {
      const api = new NotificationsApi({ apiKey: token });
      const result = await api.apiNotificationsGet();
      const NewNotifications = result.data;
      NewNotifications && setNotifications([...notifications, ...NewNotifications]);
    })();

    // Temp test with local data
    setNotifications(data);
  }, []);

  return (
    <>
      {notifications.map((n) => (
        <NotificationDisplay key={`notification-${n.id}`} notification={n} />
      ))}
    </>
  );
};

export default NotificationsPage;
