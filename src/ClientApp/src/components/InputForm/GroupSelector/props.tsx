import { GroupDto } from 'api';

export default interface GroupSelectorProps {
  group: GroupDto | undefined;
  setGroup: (group: GroupDto) => void;
}
