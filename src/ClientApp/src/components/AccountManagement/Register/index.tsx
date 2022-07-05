import React from 'react';
import { LoginForm } from '../LoginForm';

const Register = () => {
  const [inputs, setInputs] = React.useState({ email: '', name: '', pass1: '', pass2: '' });

  const set = (name: string) => (event: any) =>
    setInputs((old) => ({ ...old, [name]: event.target.value }));

  const submit = async (event: React.SyntheticEvent<unknown>) => {
    event.preventDefault();

    if (inputs.email === '' || inputs.name === '' || inputs.pass1 === '' || inputs.pass2 === '') {
      return console.error('Inputs cannot be empty.');
    } else if (inputs.pass1 !== inputs.pass2) {
      return console.error('Passwords must match.');
    }

    // register account
  };

  return (
    <LoginForm
      title="Sign Up"
      inputs={inputs}
      submit={{ href: '/', func: submit }}
      set={set}
      cancel={{ href: '/login', msg: 'Cancel' }}
      fields={[
        {
          name: 'email',
          label: 'Email Address',
          type: 'text',
          err: { cond: inputs.email.length > 20, msg: 'Email is too long.' }
        },
        {
          name: 'name',
          label: 'Name',
          type: 'text',
          err: { cond: inputs.name.length > 20, msg: 'Name is too long.' }
        },
        {
          name: 'pass1',
          label: 'Password',
          type: 'password',
          err: { cond: inputs.pass1.length > 20, msg: 'Password is too long.' }
        },
        {
          name: 'pass2',
          label: 'Confirm Password',
          type: 'password',
          err: { cond: inputs.pass2.length > 20, msg: 'Password is too long.' }
        }
      ]}
    />
  );
};

export default Register;
