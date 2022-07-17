import Notification from './NotificationProps';

interface Clicked {
  (n: Notification): void;
}

interface NotificationProps {
  notification: Notification;
  clicked: Clicked;
}

const NotificationDisplay = (props: NotificationProps) => {
  // const { notification, clicked } = props;
  console.log(props);
  return <></>;
};

export default NotificationDisplay;
