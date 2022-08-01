import { Item } from 'components/Core/Entities';

export interface ItemDisplayProps {
  items?: Item[];
  removeItem: (item: Item) => void;
}
