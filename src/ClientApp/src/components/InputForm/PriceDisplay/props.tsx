import { ButtonEventHandler } from '../../BillCreation/BillCreationProps';

export default interface PriceProps {
  price: number;
  set: ButtonEventHandler;
  disabled: boolean;
}
