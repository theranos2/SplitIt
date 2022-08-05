import { SimpleGroupDto } from 'api';

export default interface GroupSelectorProps {
  values: SimpleGroupDto | undefined;
  onChange: (group: SimpleGroupDto | undefined) => void;
  options: SimpleGroupDto[] | undefined;
}
