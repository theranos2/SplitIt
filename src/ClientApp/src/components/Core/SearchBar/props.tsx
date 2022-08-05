import { SimpleBillDto } from 'api';

export default interface SearchBarProps {
  items: SimpleBillDto[];
  setCurrentItems: (bill: SimpleBillDto[]) => void;
  filters: Record<string, <T>(bills: T[], value: any) => T[]>;
}

export interface FilterProps {
  name: string;
  value: any;
}
