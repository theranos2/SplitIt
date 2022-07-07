import React from 'react';
import { LoginForm } from '../LoginForm';
import { request } from 'utility/api';

const Register = () => {
  const [inputs, setInputs] = React.useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    password2: ''
  });

  const set = (name: string) => (event: any) =>
    setInputs((old) => ({ ...old, [name]: event.target.value }));

  const submit = async (event: any) => {
    event.preventDefault();

    if (Object.values(inputs).some((input) => input === '')) {
      return console.error('Inputs cannot be empty.');
    } else if (inputs.password !== inputs.password2) {
      return console.error('Passwords must match.');
    }

    const res = request('POST', 'Account/register', inputs);
    console.log(res);
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
          name: 'firstName',
          label: 'First name',
          type: 'text',
          err: { cond: inputs.firstName.length > 20, msg: 'Name is too long.' }
        },
        {
          name: 'lastName',
          label: 'Last name',
          type: 'text',
          err: { cond: inputs.lastName.length > 20, msg: 'Name is too long.' }
        },
        {
          name: 'password',
          label: 'Password',
          type: 'password',
          err: { cond: inputs.password.length > 20, msg: 'Password is too long.' }
        },
        {
          name: 'password2',
          label: 'Confirm Password',
          type: 'password',
          err: { cond: inputs.password2.length > 20, msg: 'Password is too long.' }
        }
      ]}
    />
  );
};

export default Register;
