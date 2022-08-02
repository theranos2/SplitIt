import ViewContainer from 'components/Core/ViewContainer';
import database from 'utility/database/database.json';
import { GroupDto } from 'api';

const GroupsView = () => {
  return (
    <ViewContainer
      title="Groups"
      description="View all of your groups"
      items={database.groups}
      filters={{
        name: (old: GroupDto[], value: any) => old.filter((e: GroupDto) => e.name.includes(value))
      }}
    />
  );
};

export default GroupsView;
