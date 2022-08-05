import { ButtonEventHandler } from 'components/Core/FormProps';

export default interface PriceProps {
  price: number;
  set: ButtonEventHandler;
  disabled: boolean;
}
