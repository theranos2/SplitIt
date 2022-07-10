export interface ButtonEventHandler {
  (event: any): void;
}

export interface ButtonSubmission {
  (event: string): ButtonEventHandler;
}

export interface Item {
  name: string;
  id: number;
  price: number;
  user: number; // a user-id
}

export interface SubmitProps {
  href: string;
  func: ButtonEventHandler;
}

export interface CancelProps {
  href: string;
  msg: string;
}

export interface InputProps {
  name: string;
  users: number[]; // an array of user-ids
  items?: Item[];
  price: number;
}
