import { InputProps, ButtonSubmission, SubmitProps, CancelProps } from '../BillCreationProps';

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
