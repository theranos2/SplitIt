interface ButtonEventHandler {
  (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void;
}

interface ButtonSubmission {
  (event: string): ButtonEventHandler;
}

export default interface DateSelectorProps {
  start: Date;
  end: Date;
  set: ButtonSubmission;
}
