import { ItemDto } from 'api';

export interface ItemDisplayProps {
  items?: ItemDto[];
  removeItem: (item: ItemDto) => void;
}
