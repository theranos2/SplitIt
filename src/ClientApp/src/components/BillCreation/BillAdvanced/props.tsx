import { Item } from 'api/models/item';
import { User } from 'api/models/user';

export default interface InputProps {
  name: string;
  users: User[]; // an array of user-ids
  items: Item[];
  price: number;
}
