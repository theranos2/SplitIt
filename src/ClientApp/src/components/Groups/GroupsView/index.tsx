import ViewContainer from 'components/Core/ViewContainer';
import database from 'utility/database/database.json';

const GroupsView = () => {
  return (
    <ViewContainer title="Groups" description="View all of your groups" items={database.groups} />
  );
};

export default GroupsView;
