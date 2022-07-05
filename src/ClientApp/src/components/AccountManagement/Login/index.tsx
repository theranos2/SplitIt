import React from 'react';
import { LoginForm } from '../LoginForm';

const Login = () => {
  const [inputs, setInputs] = React.useState({ email: '', pass: '' });

  const set = (name: string) => (event: any) =>
    setInputs((old) => ({ ...old, [name]: event.target.value }));

  const submit = (event: any) => {
    event.preventDefault();

    if (inputs.email === '' || inputs.pass === '') {
      return console.log('Inputs cannot be empty.');
    }

    // fetch('/api') login to the account in the backend
  };

  return (
    <LoginForm
      title="Sign In"
      inputs={inputs}
      set={set}
      submit={{ href: '/', func: submit }}
      cancel={{ href: '/register', msg: 'Register an account' }}
      fields={[
        {
          name: 'email',
          label: 'Email Address',
          type: 'text',
          err: {
            cond: inputs?.email?.length > 30,
            msg: 'Email must be shorter than 30 characters.'
          }
        },
        {
          name: 'pass',
          label: 'Password',
          type: 'password',
          err: {
            cond: inputs?.pass?.length < 10,
            msg: 'Password must be longer than 10 characters.'
          }
        }
      ]}
    />
  );
};

export default Login;

// https://dmitripavlutin.com/react-forms-tutorial/
