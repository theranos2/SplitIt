export interface ButtonEventHandler {
  (event: any): void;
}

export interface ButtonSubmission {
  (name: string): ButtonEventHandler;
}

export interface SubmitProps {
  href: string;
  func: ButtonEventHandler;
}

export interface CancelProps {
  href: string;
  msg: string;
}

export interface ErrorType {
  cond: boolean;
  msg: string;
}

export interface Item {
  name: string;
  id: number;
  price: number;
  user: number;
}

export interface User {
  name: string;
  id: number;
}
