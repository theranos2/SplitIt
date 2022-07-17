import React, { useState } from 'react';
import { GroupForm } from '../GroupForm';
import { InputProps } from '../props';

import { request } from 'utility/api/api';

const GroupCreate = () => {
  const [inputs, setInputs] = React.useState<InputProps>({ name: '', users: [] });

  const set = (name: string) => (input: any) => {
    name === 'users'
      ? input.forEach((e: number) => inputs['users'].push(e))
      : setInputs((old: InputProps) => ({ ...old, [name]: input.target.value }));
  };

  const submit = async (event: any) => {
    event.preventDefault();

    if (inputs.name === '' || inputs.users === []) {
      return console.error('Inputs cannot be empty.');
    }

    const data = JSON.stringify({
      name: inputs.name,
      members: inputs.users
    });

    // API call to create new group
    // return await request('put', 'group', data);
  };

  return (
    <GroupForm
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
