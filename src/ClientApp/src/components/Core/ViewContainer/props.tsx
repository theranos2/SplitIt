import { BillDto, GroupDto } from 'api';

export default interface ViewContainerProps {
  title: string;
  description: string;
  items: Array<BillDto | GroupDto>;
}
