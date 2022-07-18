import { User } from '../../BillCreation/BillCreationProps';

export interface UserDisplayProps {
  users: User[];
  removeUser: (user: User) => void;
}
