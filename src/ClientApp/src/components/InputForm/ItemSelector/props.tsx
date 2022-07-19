import { ButtonEventHandler, ErrorType } from '../InputFormProps';
import { Item, User } from '../InputFormProps';

export interface ItemSelectorProps {
  name: string;
  label: string;
  items?: Item[];
  setItems: ButtonEventHandler;
  users: User[];
  err: ErrorType;
}
