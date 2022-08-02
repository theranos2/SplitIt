import { BillDto, SimpleGroupDto } from 'api';

export default interface ViewContainerProps {
  title: string;
  description: string;
  items: Array<BillDto | SimpleGroupDto>;
  filters: Record<string, (items: any[], value: any) => any[]>;
}
