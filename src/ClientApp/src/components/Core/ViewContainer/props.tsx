import { SimpleBillDto, SimpleGroupDto } from 'api';

export default interface ViewContainerProps {
  title: string;
  description: string;
  items: Array<SimpleBillDto | SimpleGroupDto>;
  filters: Record<string, (items: any[], value: any) => any[]>;
}
