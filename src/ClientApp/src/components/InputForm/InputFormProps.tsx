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
