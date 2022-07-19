import { Item } from '../../BillCreation/BillCreationProps';

export interface ItemDisplayProps {
  items?: Item[];
  removeItem: (item: Item) => void;
}
