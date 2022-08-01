import { InputProps } from '../BillCreationProps';
import { ButtonSubmission, SubmitProps, CancelProps } from 'components/Core/FormProps';

export default interface BillFormProps {
  title: string;
  inputs: InputProps;
  set: ButtonSubmission;
  submit: SubmitProps;
  cancel: CancelProps;
  fields: Array<Record<any, any>>;
}

export interface Steps {
  element: React.ReactNode;
  label: string;
}
