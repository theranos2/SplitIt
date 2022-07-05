interface ButtonEventHandler {
  (event: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>): void;
}

interface ButtonSubmission {
  (event: string): ButtonEventHandler;
}

interface ErrorType {
  cond: boolean;
  msg: string;
}

export default interface InputFieldProps {
  name: string;
  label: string;
  type: string;
  inputs: Record<string, any>;
  set: ButtonSubmission;
  err: ErrorType;
}
