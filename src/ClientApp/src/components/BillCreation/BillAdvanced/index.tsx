import * as React from 'react';

import { BillForm } from '../BillForm';
import InputProps from './props';
import { Item } from '../BillCreationProps';

const BillAdvanced = () => {
  const [inputs, setInputs] = React.useState<InputProps>({
    name: '',
    users: [],
    items: [],
    price: 0
  });

  const set = (name: string) => (input: any) => {
    // should be event<???> | Array<number> | Array<Item>
    switch (name) {
      case 'users':
        input.forEach((e: number) => inputs['users'].push(e));
        break;
      case 'items':
        input.forEach((e: Item) => inputs['items'].push(e));
        break;
      default:
        setInputs((old: InputProps) => ({ ...old, [name]: input.target.value }));
    }
  };

  const submit = async (event: any) => {
    event.preventDefault();

    if (inputs.name === '' || inputs.users === [] || inputs.price === 0 || inputs.items === []) {
      return console.error('Inputs cannot be empty.');
    }

    // send the new bill to the backend
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
          label: 'Name',
          type: 'text',
          err: { cond: inputs.name.length > 20, msg: 'Name is too long.' }
        },
        {
          name: 'users',
          label: 'Users',
          type: 'users',
          err: { cond: inputs.users === [], msg: "You haven't added any users." }
        },
        {
          name: 'items',
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
