import { Item, User } from '../BillCreationProps';

export default interface InputProps {
  name: string;
  users: User[]; // an array of user-ids
  items: Item[];
  price: number;
}
