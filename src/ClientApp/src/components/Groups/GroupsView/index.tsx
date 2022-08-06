import { useEffect, useState } from 'react';
import ViewContainer from 'components/Core/ViewContainer';
import { SimpleGroupDto, GroupApi } from 'api';
import { useAuthContext } from 'utility/hooks/useAuth';

const GroupsView = () => {
  const [groups, SetGroups] = useState<SimpleGroupDto[]>([]);
  const { token } = useAuthContext();
  useEffect(() => {
    const api = new GroupApi({ apiKey: token });
    (async () => {
      const resp = await api.apiGroupGet();
      SetGroups(resp.data);
    })();
  }, []);

  return (
    <ViewContainer
      title="Groups"
      description="View all of your groups"
      items={groups}
      filters={{
        name: (old: SimpleGroupDto[], value: any) =>
          old.filter((e: SimpleGroupDto) => e.name?.includes(value))
      }}
    />
  );
};

export default GroupsView;
