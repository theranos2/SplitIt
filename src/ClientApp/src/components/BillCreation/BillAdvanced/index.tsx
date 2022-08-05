import { useState } from 'react';

import FormSteps from 'components/Core/FormSteps';
import InputProps from 'components/Core/InputProps';

import { BillApi, UserInfoDto } from 'api';
import { useToken } from 'utility/hooks';

const BillAdvanced = () => {
  const [inputs, setInputs] = useState<InputProps>({
    name: '',
    price: 0,
    users: [],
    items: [],
    group: undefined
  });

  const set = (name: string) => (input: any) => {
    switch (name) {
      case 'items':
        setInputs((old: InputProps) => ({ ...old, items: input }));
        setInputs((old: InputProps) => ({
          ...old,
          price: old.items ? old.items.reduce((i, j) => (j.price ? i + j.price : i), 0) : 0
        }));
        break;
      case 'users':
      case 'group':
        setInputs((old: InputProps) => ({ ...old, users: input }));
        break;
      default:
        setInputs((old: InputProps) => ({ ...old, [name]: input.target.value }));
    }
  };

  const submit = async (event: any) => {
    event.preventDefault();

    if (inputs.name === '' || inputs.price === 0 || inputs.items === []) {
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
      title="Create an advanced bill"
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
          menu_label: 'Invite some friends',
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
        {
          name: 'items',
          menu_label: 'Add your items',
          label: 'Items',
          type: 'items',
          err: { cond: inputs.items === [], msg: "You haven't added any items." }
        },
        { name: 'price', label: 'Price', type: 'price', disabled: true }
      ]}
    />
  );
};

export default BillAdvanced;
