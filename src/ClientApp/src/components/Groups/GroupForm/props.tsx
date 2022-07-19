import { InputProps, ButtonSubmission, SubmitProps, CancelProps } from '../props';

export default interface GroupFormProps {
  title: string;
  inputs: InputProps;
  set: ButtonSubmission;
  submit: SubmitProps;
  cancel: CancelProps;
  fields: Array<Record<string, any>>; // TODO: should be the actual types
}
