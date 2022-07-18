import React from 'react';
import { LoginForm } from '../LoginForm';
import { login } from 'utility/api/account';

const Login = () => {
  const [inputs, setInputs] = React.useState({ email: '', password: '' });

  const set = (name: string) => (event: any) =>
    setInputs((old) => ({ ...old, [name]: event.target.value }));

  const submit = async (event: any) => {
    event.preventDefault();

    if (inputs.email === '' || inputs.password === '') {
      return { error: true, msg: 'Inputs cannot be empty.' };
    } else {
      return login(inputs);
    }
  };

  const fake_login = () => login({ email: 'test@test.com', password: 'password' });

  return (
    <LoginForm
      title="Sign In"
      inputs={inputs}
      set={set}
      submit={{ href: '/', func: fake_login }}
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
