import { ButtonEventHandler, ErrorType } from '../InputFormProps';

export default interface InputFieldProps {
  name: string;
  label: string;
  type: string;
  inputs: Record<string, any>;
  set: ButtonEventHandler;
  err: ErrorType;
}
