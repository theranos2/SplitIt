interface ButtonEventHandler {
  (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void;
}

interface ButtonSubmission {
  (event: string): ButtonEventHandler;
}

interface SubmitProps {
  href: string;
  func: ButtonEventHandler;
}

interface CancelProps {
  href: string;
  msg: string;
}

interface Item {
  name: string;
  price: number;
  user: number; // a user-id
}

interface InputProps {
  name: string;
  users: number[]; // an array of user-ids
  items?: Item[];
  price: number;
}

export default interface BillFormProps {
  title: string;
  inputs: InputProps;
  set: ButtonSubmission;
  submit: SubmitProps;
  cancel: CancelProps;
  fields: Array<Record<string, any>>; // TODO: should be the actual types
}
