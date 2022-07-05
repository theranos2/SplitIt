import React from 'react';

interface ButtonEventHandler {
  (event: any): void;
}

interface ButtonSubmission {
  (name: string): ButtonEventHandler;
}

interface SubmitProps {
  href: string;
  func: ButtonEventHandler;
}

interface CancelProps {
  href: string;
  msg: string;
}

export default interface LoginFormProps {
  title: string;
  inputs: Record<string, string>;
  set: ButtonSubmission;
  submit: SubmitProps;
  cancel: CancelProps;
  fields: Array<Record<string, any>>; // TODO: should be the actual types
}
