import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';

import Login from './components/AccountManagement/Login';
import Register from './components/AccountManagement/Register';
import BillCreate from './components/BillCreation/BillCreate';
import BillSimple from './components/BillCreation/BillSimple';
import BillAdvanced from './components/BillCreation/BillAdvanced';

import NotFound from './components/NotFound';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route exact path="/" element={<HomePage/>}/> */}
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/bill/create" element={<BillCreate/>}/>
        <Route path="/bill/simple" element={<BillSimple/>}/>
        <Route path="/bill/advanced" element={<BillAdvanced/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
