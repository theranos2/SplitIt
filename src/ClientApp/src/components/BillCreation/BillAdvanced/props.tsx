import { Item } from '../BillCreationProps';

export default interface InputProps {
  name: string;
  users: number[]; // an array of user-ids
  items: Item[];
  price: number;
}
