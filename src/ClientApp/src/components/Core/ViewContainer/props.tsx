import { Bill } from 'api/models/bill';

export default interface ViewContainerProps {
  title: string;
  description: string;
  bills?: Bill[];
}
