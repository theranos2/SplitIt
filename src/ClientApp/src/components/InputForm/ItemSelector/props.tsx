import { ButtonEventHandler, ErrorType } from 'components/Core/FormProps';
import { DetailedItemDto, UserInfoDto } from 'api';

export interface ItemSelectorProps {
  name: string;
  label: string;
  items?: DetailedItemDto[];
  setItems: ButtonEventHandler;
  users: UserInfoDto[];
  err: ErrorType;
}
