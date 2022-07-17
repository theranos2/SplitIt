import React from 'react';

import { Box, Button, Container } from '@mui/material';

import { request } from 'utility/api/api';
import Notification from './NotificationProps';
import NotificationDisplay from './Notification';

const NotificationsPage = () => {
  const [notifications, AddNotifications] = React.useState<Array<Notification>>([]);
  const [hideRead, setHideRead] = React.useState<boolean>(false);

  React.useEffect(() => {
    // (async () => {
    //   const NewNotifications = await request('GET', '/notifications/:user_id');
    //   NewNotifications && AddNotifications(NewNotifications as Notification[]);
    // })();

    /////////////////
    AddNotifications((notifications) => [{ id: 1, content: 'notif1', seen: true }]);
    AddNotifications((notifications) =>
      notifications.concat([{ id: 2, content: 'notif2', seen: true }])
    );
    AddNotifications((notifications) =>
      notifications.concat([{ id: 3, content: 'unread notif1', seen: false }])
    );
    AddNotifications((notifications) =>
      notifications.concat([{ id: 4, content: 'unread notif2', seen: false }])
    );
    AddNotifications((notifications) =>
      notifications.concat([{ id: 5, content: 'unread notif3', seen: false }])
    );
  }, []);

  const clicked = (n: Notification) => {
    console.log('clicked');
    // n.seen || request('PUT', 'notification/:id/seen');
    // // go to the relevant link maybe?
  };

  return (
    <>
      <Box style={{ cursor: 'pointer' }}>
        <Button onClick={() => setHideRead(false)}>All</Button>
        <Button onClick={() => setHideRead(true)}>Unread</Button>
      </Box>

      {notifications
        .filter((n) => !hideRead || n.seen)
        .map((n) => (
          <NotificationDisplay key={`notification-${n.id}`} notification={n} clicked={clicked} />
        ))}
    </>
  );
};

export default NotificationsPage;
