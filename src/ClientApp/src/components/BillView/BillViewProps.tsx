import { Item, User } from '../BillCreation/BillCreationProps';

export interface Bill {
  id: number;
  name: string;
  price: number;
  users: User[];
  items?: Item[];
}
