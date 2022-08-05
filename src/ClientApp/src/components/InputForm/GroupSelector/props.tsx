import { SimpleGroupDto } from 'api';

export default interface GroupSelectorProps {
  values: SimpleGroupDto | undefined;
  onChange: (group: SimpleGroupDto) => void;
  options: SimpleGroupDto[] | undefined;
}
