import React from 'react';

export interface Item {
  name: string;
  id: number;
  price: number;
  user: number;
}

interface ButtonEventHandler {
  (event: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> | Array<Item>): void;
}

interface ButtonSubmission {
  (event: string): ButtonEventHandler;
}

interface ErrorType {
  cond: boolean;
  msg: string;
}

export interface ItemSelectorProps {
  name: string;
  label: string;
  inputs: Record<string, Item>;
  set: ButtonSubmission;
  err: ErrorType;
}
