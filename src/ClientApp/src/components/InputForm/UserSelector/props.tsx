import { ButtonEventHandler, ErrorType } from '../InputFormProps';

export interface UserSelectorProps {
  name: string;
  label: string;
  users: number[];
  setUsers: ButtonEventHandler;
  err: ErrorType;
}
