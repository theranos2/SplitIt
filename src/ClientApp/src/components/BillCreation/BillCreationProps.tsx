import { UserDto, ItemDto, GroupDto } from 'api';

export interface InputProps {
  name: string;
  users: UserDto[]; // an array of user-ids
  items?: ItemDto[];
  group: GroupDto;
  price: number;
}
