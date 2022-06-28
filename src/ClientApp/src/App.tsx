import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

import Login from './components/AccountManagement/Login';

const App = () => {
  return (
    <BrowserRouter>
        <Login/>
    </BrowserRouter>
  );
}

export default App;
