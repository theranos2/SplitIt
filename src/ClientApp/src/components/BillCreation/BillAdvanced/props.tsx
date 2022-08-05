import { DetailedItemDto, UserInfoDto, GroupDto } from 'api';

export default interface InputProps {
  name: string;
  price: number;
  users: UserInfoDto[]; // an array of user-ids
  items: DetailedItemDto[];
  group: GroupDto | undefined;
}
