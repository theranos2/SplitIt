import { ButtonSubmission, ErrorType } from '../InputFormProps';

export interface ItemSelectorProps {
  name: string;
  label: string;
  inputs: Record<string, any>;
  set: ButtonSubmission;
  err: ErrorType;
}
