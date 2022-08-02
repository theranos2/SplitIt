import { UserInfoDto } from 'api';

export interface UserDisplayProps {
  users: UserInfoDto[];
  removeUser: (user: UserInfoDto) => void;
}
