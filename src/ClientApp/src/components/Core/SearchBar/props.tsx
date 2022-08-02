import { BillDto } from 'api';

export default interface SearchBarProps {
  items: BillDto[];
  setCurrentItems: (bill: BillDto[]) => void;
  filters: Record<string, <T>(bills: T[], value: any) => T[]>;
}

export interface FilterProps {
  name: string;
  value: any;
}
