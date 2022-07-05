import React from 'react';

interface ButtonEventHandler {
  (event: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> | number[]): void;
}

interface ButtonSubmission {
  (event: string): ButtonEventHandler;
}

interface ErrorType {
  cond: boolean;
  msg: string;
}

export interface User {
  name: string;
  id: number;
}

export interface UserSelectorProps {
  name: string;
  label: string;
  inputs: Record<string, any>;
  set: ButtonSubmission;
  err: ErrorType;
}
