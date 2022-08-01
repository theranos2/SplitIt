import { Item, User } from 'components/Core/Entities';

export interface InputProps {
  name: string;
  users: User[]; // an array of user-ids
  items?: Item[];
  price: number;
}
