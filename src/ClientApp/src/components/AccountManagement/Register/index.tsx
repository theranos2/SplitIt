import React from 'react';
import { LoginForm } from '../LoginForm';
import { AccountApi } from 'api';

const Register = () => {
  const [inputs, setInputs] = React.useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    password_confirm: ''
  });

  const set = (name: string) => (event: any) =>
    setInputs((old) => ({ ...old, [name]: event.target.value }));

  const submit = async (event: any) => {
    event.preventDefault();

    if (Object.values(inputs).some((input) => input === '')) {
      return { status: 400, statusText: 'Inputs cannot be empty.' };
    } else if (inputs.password !== inputs.password_confirm) {
      return { status: 400, statusText: 'Passwords must match.' };
    } else {
      await new AccountApi().apiAccountRegisterPost(inputs);
    }
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
          err: { cond: inputs.email.length > 40, msg: 'Email is too long.' }
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
          name: 'password_confirm',
          label: 'Confirm Password',
          type: 'password',
          err: { cond: inputs.password !== inputs.password_confirm, msg: 'Passwords do not match.' }
        }
      ]}
    />
  );
};

export default Register;
