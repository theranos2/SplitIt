import React from 'react';

import { request } from 'utility/api/api';
import Notification from './NotificationProps';
import NotificationDisplay from './Notification';

const NotificationsPage = () => {
  const [notifications, AddNotifications] = React.useState<Array<Notification>>([]);

  React.useEffect(() => {
    (async () => {
      const NewNotifications = await request('GET', '/notifications/:user_id');
      NewNotifications && AddNotifications(NewNotifications as Notification[]);
    })();
  }, []);

  const clicked = (n: Notification) => {
    n.seen || request('PUT', 'notification/:id/seen');
    // go to the relevant link maybe?
  };

  return (
    <>
      {notifications.map((n) => {
        <NotificationDisplay key={`notification-${n.id}`} notification={n} clicked={clicked} />;
      })}
    </>
  );
};

export default NotificationsPage;
