import React from 'react';

import FormSteps from 'components/Core/FormSteps';
import InputProps from './props';

import { useAuthContext } from 'utility/hooks/useAuth';
import { BillApi, UserInfoDto } from 'api';
import { useToken } from 'utility/hooks';

const BillSimple = () => {
  const [inputs, setInputs] = React.useState<InputProps>({
    name: '',
    price: 0,
    users: [],
    group: undefined
  });

  const set = (name: string) => (input: any) => {
    name === 'users'
      ? setInputs((old: InputProps) => ({ ...old, [name]: input }))
      : setInputs((old: InputProps) => ({ ...old, [name]: input.target.value }));
  };

  const submit = async (event: any) => {
    event.preventDefault();

    if (inputs.name === '' || inputs.users === [] || inputs.price === 0) {
      return console.error('Inputs cannot be empty.');
    } else {
      const res = await new BillApi({ apiKey: useToken() ?? '' }).apiBillSimplePost({
        title: inputs.name,
        userIds: inputs.users.map((user: UserInfoDto) => `${user.firstName} ${user.lastName}`),
        total: inputs.price
      });
      if (res.status === 200) {
        console.log('success');
      } else {
        console.log('failure');
      }
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
        { name: 'price', label: 'Price', type: 'price', disabled: false }
      ]}
    />
  );
};

export default BillSimple;
