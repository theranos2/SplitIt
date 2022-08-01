import { ButtonEventHandler, ErrorType } from 'components/Core/FormProps';
import { Item, User } from 'components/Core/Entities';

export interface ItemSelectorProps {
  name: string;
  label: string;
  items?: Item[];
  setItems: ButtonEventHandler;
  users: User[];
  err: ErrorType;
}
