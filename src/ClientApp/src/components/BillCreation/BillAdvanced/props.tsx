import { Item, User } from 'components/Core/Entities';

export default interface InputProps {
  name: string;
  users: User[]; // an array of user-ids
  items: Item[];
  price: number;
}
