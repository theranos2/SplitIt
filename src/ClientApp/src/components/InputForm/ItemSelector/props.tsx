import { ButtonEventHandler, ErrorType } from 'components/Core/FormProps';
import { ItemDto, UserInfoDto } from 'api';

export interface ItemSelectorProps {
  name: string;
  label: string;
  items?: ItemDto[];
  setItems: ButtonEventHandler;
  users: UserInfoDto[];
  err: ErrorType;
}
