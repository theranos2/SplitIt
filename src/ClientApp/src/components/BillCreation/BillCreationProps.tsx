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

export interface User {
  firstName: string;
  lastName: string;
  id: number;
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
  users: User[]; // an array of user-ids
  items?: Item[];
  price: number;
}
