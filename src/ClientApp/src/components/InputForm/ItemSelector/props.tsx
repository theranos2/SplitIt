import { ButtonEventHandler, ErrorType } from '../InputFormProps';

export interface ItemSelectorProps {
  name: string;
  label: string;
  items: Record<any, any>;
  setItems: ButtonEventHandler;
  err: ErrorType;
}
