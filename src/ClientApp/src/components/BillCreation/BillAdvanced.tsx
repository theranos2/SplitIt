import * as React from 'react';

import { BillForm } from './BillForm';

interface InputProps {
  name: string,
  users: number[],
  items: number[],
  price: number
}

const BillAdvanced = () => {
  const [inputs, setInputs] = React.useState<InputProps>({ name: '', users: [], items: [], price: 0 });
  
  const set = (name : string) => (input : any) => {
    switch (name) {
      case 'users':
      case 'items':
        input.forEach((e : number) => inputs[name].push(e));
        break;
      default:
        setInputs(old => ({ ...old, [name]: input.target.value }));
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
        { name: 'users', label: 'Users', type: 'users', err: { cond: (inputs.users === []), msg: 'You haven\'t added any users.' } },
        { name: 'items', label: 'Items', type: 'users', err: { cond: (inputs.items === []), msg: 'You haven\'t added any items.' } },
      ]}
    />
  );
};

export default BillAdvanced;
