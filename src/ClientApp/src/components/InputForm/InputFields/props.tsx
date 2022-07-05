import { ButtonSubmission, ErrorType } from '../InputFormProps';

export default interface InputFieldProps {
  name: string;
  label: string;
  type: string;
  inputs: Record<string, any>;
  set: ButtonSubmission;
  err: ErrorType;
}
