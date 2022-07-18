import { ButtonEventHandler, ErrorType } from '../InputFormProps';
import { Item } from '../InputFormProps';

export interface ItemSelectorProps {
  name: string;
  label: string;
  items: Item[];
  setItems: ButtonEventHandler;
  err: ErrorType;
}
