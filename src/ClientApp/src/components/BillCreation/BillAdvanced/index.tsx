import * as React from 'react';

import { BillForm } from '../BillForm';
import InputProps from './props';

const BillAdvanced = () => {
  const [inputs, setInputs] = React.useState<InputProps>({
    name: '',
    users: [],
    items: [],
    price: 0
  });

  const set = (name: string) => (input: any) => {
    switch (name) {
      case 'items':
        setInputs((old: InputProps) => ({ ...old, items: input }));
        setInputs((old: InputProps) => ({
          ...old,
          price: old.items.reduce((i, j) => (j.price ? i + j.price : i), 0)
        }));
        break;
      case 'users':
        setInputs((old: InputProps) => ({ ...old, users: input }));
        break;
      default:
        setInputs((old: InputProps) => ({ ...old, [name]: input.target.value }));
    }
  };

  const submit = async (event: any) => {
    event.preventDefault();

    if (inputs.name === '' || inputs.users === [] || inputs.price === 0 || inputs.items === []) {
      return console.error('Inputs cannot be empty.');
    } else {
      // send the new bill to the backend
    }
  };

  return (
    <BillForm
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
