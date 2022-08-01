import { UserDto, ItemDto } from 'api';

export interface InputProps {
  name: string;
  users: UserDto[]; // an array of user-ids
  items?: ItemDto[];
  price: number;
}
