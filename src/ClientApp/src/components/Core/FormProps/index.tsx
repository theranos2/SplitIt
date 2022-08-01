export interface ButtonEventHandler {
  (event: any): void;
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
