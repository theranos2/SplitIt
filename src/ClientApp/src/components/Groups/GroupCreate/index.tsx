import { useState } from 'react';

import { GroupApi, UserInfoDto } from 'api';
import { useToken } from 'utility/hooks';

import FormSteps from 'components/Core/FormSteps';
import { GroupCreateProps } from './props';

const GroupCreate = () => {
  const [inputs, setInputs] = useState<GroupCreateProps>({ name: '', users: [] });

  const set = (name: string) => (input: any) => {
    name === 'users'
      ? setInputs((old: GroupCreateProps) => ({ ...old, users: input }))
      : setInputs((old: GroupCreateProps) => ({ ...old, [name]: input.target.value }));
  };

  const submit = async (event: any) => {
    event.preventDefault();

    if (inputs.name === '' || inputs.users === []) {
      return { status: 400, statusText: 'Inputs cannot be empty.' };
    } else {
      return await new GroupApi({ apiKey: useToken() ?? '' }).apiGroupPost({
        name: inputs.name,
        memberIds: inputs.users.map((user: UserInfoDto) => user.id ?? '')
      });
    }
  };

  return (
    <FormSteps
      title="Create a group"
      inputs={inputs}
      submit={{ href: '/', func: submit }}
      set={set}
      cancel={{ href: '/groups', msg: 'Cancel' }}
      fields={[
        {
          name: 'name',
          menu_label: 'Name the group',
          label: 'Name',
          type: 'text',
          err: { cond: inputs.name.length > 20, msg: 'Name is too long.' }
        },
        {
          name: 'users',
          menu_label: 'Add some members',
          label: 'Members',
          type: 'users',
          err: { cond: inputs.users === [], msg: "You haven't added any members." }
        }
      ]}
    />
  );
};

export default GroupCreate;
