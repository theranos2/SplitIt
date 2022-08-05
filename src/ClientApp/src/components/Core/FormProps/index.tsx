export interface ButtonEventHandler {
  (event: any): any;
}

export interface ButtonSubmission {
  (event: string): ButtonEventHandler;
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
