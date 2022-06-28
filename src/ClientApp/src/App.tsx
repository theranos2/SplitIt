import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';

import Login from './components/AccountManagement/Login';
import Register from './components/AccountManagement/Register';
import BillAdvanced from './components/BillCreation/BillAdvanced';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/bill/create" element={<BillAdvanced/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
