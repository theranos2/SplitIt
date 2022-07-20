import { UserDto } from 'api/models';

export interface UserSelectorProps {
  setSelectedUsers: (users: UserDto[]) => void;
}
