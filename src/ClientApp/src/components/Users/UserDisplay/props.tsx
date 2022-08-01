import { User } from 'components/Core/Entities';

export interface UserDisplayProps {
  users: User[];
  removeUser: (user: User) => void;
}
