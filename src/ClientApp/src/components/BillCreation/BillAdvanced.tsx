import * as React from 'react';

import { BillForm } from '../InputForm/BillForm';

interface InputProps {
  name: string,
  users: number[],
  items: number[],
  price: number
}

const BillAdvanced = () => {
  const [inputs, setInputs] = React.useState<InputProps>({ name: '', users: [], items: [], price: 0 });
  
  const set = (name : string) => (event : any) => {
    switch (name) {
      case 'users':
      case 'items':
        inputs[name].push(event.target.value);
        console.log(inputs[name]);
        break;
      default:
        setInputs(old => ({ ...old, [name]: event.target.value }));
    }
  }

  const submit = async (event : any) => {
    event.preventDefault();

    if (inputs.name === '' || inputs.users === [] || inputs.price === 0 || inputs.items === []) {
      return console.error('Inputs cannot be empty.');
    }

    // send the new bill to the backend
  }

  return (
    <BillForm title='Create an advanced bill' inputs={inputs} submit={{ href: '/', func: submit }} set={set} cancel={{ href: '/', msg: 'Cancel' }}
      fields={[
        { name: 'name', label: 'Name', type: 'text', err: { cond: (inputs.name.length > 20), msg: 'Name is too long.' } },
        { name: 'users', label: 'Users', type: 'users', err: { cond: (inputs.users.length === 0), msg: 'You haven\'t added any users.' } },
        { name: 'items', label: 'Items', type: 'users', err: { cond: (inputs.items.length === 0), msg: 'You haven\'t added any items.' } },
        // { name: 'pass2', label: 'Confirm Password', type: 'password', err: { cond: (inputs.pass2.length > 20), msg: 'Password is too long.' } },
      ]}
    />
  );
};

export default BillAdvanced;
