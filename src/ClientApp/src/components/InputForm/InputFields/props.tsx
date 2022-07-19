import { ButtonEventHandler, ErrorType } from '../InputFormProps';

export default interface InputFieldProps {
  name: string;
  label: string;
  type: string;
  inputs: any;
  set: ButtonEventHandler;
  err: ErrorType;
}
