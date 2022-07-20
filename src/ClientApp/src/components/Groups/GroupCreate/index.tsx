import React, { useState } from 'react';
import { GroupForm } from '../GroupForm';
import { InputProps } from '../GroupProps';

import { UserDto } from 'api/models';
import { GroupApi } from 'api';

const GroupCreate = () => {
  const [inputs, setInputs] = React.useState<InputProps>({ name: '', users: [] });
  const [selectedUsers, setSelectedUsers] = useState<UserDto[]>([]);

  const set = (name: string) => (input: any) => {
    name === 'users'
      ? input.forEach((e: number) => inputs['users'].push(e))
      : setInputs((old: InputProps) => ({ ...old, [name]: input.target.value }));
  };

  const submit = async (event: any) => {
    event.preventDefault();

    console.log(selectedUsers);
    const api = new GroupApi({ apiKey: window.localStorage.getItem('token') ?? '' });

    const memberIdsx = selectedUsers.map((x) => x.id ?? '');
    await api.apiGroupPost({ name: inputs.name, memberIds: memberIdsx });
  };

  return (
    <GroupForm
      setSelectedUsers={setSelectedUsers}
      title="Create a group"
      inputs={inputs}
      submit={{ href: '/', func: submit }}
      set={set}
      cancel={{ href: '/groups', msg: 'Cancel' }}
      fields={[
        {
          name: 'name',
          label: 'Name',
          type: 'text',
          err: { cond: inputs.name.length > 20, msg: 'Name is too long.' }
        },
        {
          name: 'users',
          label: 'Users',
          type: 'users',
          err: { cond: inputs.users === [], msg: "You haven't added any users." }
        }
      ]}
    />
  );
};

export default GroupCreate;
