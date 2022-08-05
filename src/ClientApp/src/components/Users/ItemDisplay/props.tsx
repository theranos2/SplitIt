import { DetailedItemDto } from 'api';

export interface ItemDisplayProps {
  items?: DetailedItemDto[];
  removeItem: (item: DetailedItemDto) => void;
}
