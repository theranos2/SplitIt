import { UserInfoDto } from 'api';

export interface GroupCreateProps {
  name: string;
  users: UserInfoDto[];
}
