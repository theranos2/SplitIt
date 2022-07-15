import { ButtonEventHandler } from '../BillCreationProps';

export default interface PriceProps {
  price: number;
  set: ButtonEventHandler;
  disabled: boolean;
}
