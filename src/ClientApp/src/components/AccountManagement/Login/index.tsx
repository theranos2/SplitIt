import React from 'react';
import { LoginForm } from '../LoginForm';
import { AccountApi } from 'api';

const Login = () => {
  const [inputs, setInputs] = React.useState({ email: '', password: '' });

  const set = (name: string) => (event: any) =>
    setInputs((old) => ({ ...old, [name]: event.target.value }));

  const submit = async (event: any) => {
    event.preventDefault();

    if (inputs.email === '' || inputs.password === '') {
      return { status: 400, statusText: 'Inputs cannot be empty.' };
    } else {
      return await new AccountApi().apiAccountLoginPost(inputs);
    }
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
          name: 'password',
          label: 'Password',
          type: 'password',
          err: {
            cond: inputs?.password?.length < 6,
            msg: 'Password must be 6 characters or longer.'
          }
        }
      ]}
    />
  );
};

export default Login;

// https://dmitripavlutin.com/react-forms-tutorial/
