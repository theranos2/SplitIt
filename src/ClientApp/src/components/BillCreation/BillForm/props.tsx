import { InputProps, ButtonSubmission, SubmitProps, CancelProps } from '../BillCreationProps';

export default interface BillFormProps {
  title: string;
  inputs: InputProps;
  set: ButtonSubmission;
  submit: SubmitProps;
  cancel: CancelProps;
  fields: Array<Record<string, any>>; // TODO: should be the actual types
}
