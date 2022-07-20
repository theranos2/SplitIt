import { ButtonEventHandler, ErrorType } from '../InputFormProps';
import { User } from '../InputFormProps';

export default interface UserSelectorProps {
  name: string;
  label: string;
  users: User[];
  setUsers: ButtonEventHandler;
  err: ErrorType;
}
