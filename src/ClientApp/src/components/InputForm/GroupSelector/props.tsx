import { GroupDto } from 'api';

export default interface GroupSelectorProps {
  group: GroupDto;
  setGroup: (group: GroupDto) => void;
}
