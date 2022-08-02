import { ItemDto, UserInfoDto, GroupDto } from 'api';

export default interface InputProps {
  name: string;
  price: number;
  group: GroupDto | undefined;
  users: UserInfoDto[]; // an array of user-ids
  items?: ItemDto[];
}
