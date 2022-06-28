import React from 'react';
import { LoginForm } from '../InputForm/LoginForm';

const Login = () => {
    const [input, setInput] = React.useState({ email: '', pass: '' });
    // const set = (name : string) => ({ target: { value } }) => setInputs(old => ({ ...old, [name]: value }));
    
    const submit = (event : any) => {
        event.preventDefault();

        if (input.email === '' || input.pass === '') {
            return console.log('Inputs cannot be empty.');
        }
    };

    return (
        <LoginForm title='Sign In' inputs={input} set={() => {}/*set*/}
            submit={{ href: '/', func: submit }} cancel={{ href: '/register', msg: 'Register an account' }}
            fields={[
                { name: 'email', label: 'Email Address', type: 'text', err: { cond: (input.email.length > 30), msg: 'Email must be shorter than 30 characters.' } },
                { name: 'pass', label: 'Password', type: 'password', err: { cond: (input.pass.length < 10), msg: 'Password must be longer than 10 characters.' } },
            ]}
        />
    );
};

export default Login;

// https://dmitripavlutin.com/react-forms-tutorial/
