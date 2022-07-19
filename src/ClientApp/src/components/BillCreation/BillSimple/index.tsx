import * as React from 'react';

import { BillForm } from '../BillForm';
import { InputProps } from '../BillCreationProps';
import { simple_create } from 'utility/api/billcreate';

const BillSimple = () => {
  const [inputs, setInputs] = React.useState<InputProps>({ name: '', users: [], price: 0 });

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
      return simple_create(inputs);
    }
  };

  return (
    <BillForm
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
