import { ButtonEventHandler, ErrorType } from 'components/Core/FormProps';

export default interface InputFieldProps {
  name: string;
  label: string;
  type: string;
  inputs: any;
  set: ButtonEventHandler;
  err: ErrorType;
}
