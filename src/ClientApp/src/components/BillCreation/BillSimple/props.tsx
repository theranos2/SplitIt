import { UserInfoDto, GroupDto } from 'api';

export default interface InputProps {
  name: string;
  price: number;
  users: UserInfoDto[]; // an array of user-ids
  group: GroupDto | undefined;
}
