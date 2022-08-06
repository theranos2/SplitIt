import { useState } from 'react';

import FormSteps from 'components/Core/FormSteps';
import InputProps from './props';

import { BillApi, UserInfoDto } from 'api';
import { useToken } from 'utility/hooks';

const BillSimple = () => {
  const [inputs, setInputs] = useState<InputProps>({
    name: '',
    price: 0,
    users: [],
    group: undefined
  });

  const set = (name: string) => (input: any) => {
    name === 'users' || name === 'group'
      ? setInputs((old: InputProps) => ({ ...old, [name]: input }))
      : setInputs((old: InputProps) => ({ ...old, [name]: input.target.value }));
  };

  const submit = async (event: any) => {
    event.preventDefault();

    if (inputs.name === '' || inputs.price === 0) {
      return { status: 400, statusText: 'Inputs cannot be empty.' };
    } else {
      return await new BillApi({ apiKey: useToken() ?? '' }).apiBillSimplePost({
        title: inputs.name,
        userIds: inputs.users.map((user: UserInfoDto) => user.id ?? ''),
        total: inputs.price
      });
    }
  };

  return (
    <FormSteps
      title="Create a simple bill"
      inputs={inputs}
      submit={{ href: '/', func: submit }}
      set={set}
      cancel={{ href: '/bill/create', msg: 'Cancel' }}
      fields={[
        {
          name: 'name',
          menu_label: 'Name the bill',
          label: 'Name',
          type: 'text',
          err: { cond: inputs.name.length > 20, msg: 'Name is too long.' }
        },
        {
          name: 'users',
          menu_label: 'Add some friends',
          label: 'Users',
          type: 'users',
          err: { cond: inputs.users === [], msg: "You haven't added any users." }
        },
        {
          name: 'group',
          menu_label: 'Choose a group (optional)',
          label: 'Group',
          type: 'group',
          err: { cond: inputs.group === undefined, msg: "You haven't chosen a group." }
        },
        { name: 'price', label: 'Price', type: 'price', disabled: false }
      ]}
    />
  );
};

export default BillSimple;
