import { Bill } from '../BillViewProps';

export default interface ViewContainerProps {
  title: string;
  description: string;
  bills?: Bill[];
}
