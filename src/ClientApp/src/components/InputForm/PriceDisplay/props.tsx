import { ButtonEventHandler } from 'components/Core/FormProps';

export default interface PriceProps {
  price: number | undefined;
  set: ButtonEventHandler;
  disabled: boolean;
}
