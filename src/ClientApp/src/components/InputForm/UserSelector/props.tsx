import { UserDto } from 'api/models';
import { ButtonSubmission, ErrorType } from '../InputFormProps';

export interface UserSelectorProps {
  setSelectedUsers: (users: UserDto[]) => void
}
