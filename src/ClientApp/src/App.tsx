import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import './App.css';

import Login from './components/AccountManagement/Login';
import Register from './components/AccountManagement/Register';

import BillCreate from './components/BillCreation/BillCreate';
import BillSimple from './components/BillCreation/BillSimple';
import BillAdvanced from './components/BillCreation/BillAdvanced';
import BillsAll from './components/BillView/BillsAll';

import GroupCreate from './components/Groups/GroupCreate';

import NotFound from './components/NotFound';
import HomePage from './components/HomePage';

import TopNavigation from './components/TopNavigation';

const App = () => {
  return (
    <BrowserRouter>
      <TopNavigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/bill/view" element={<BillsAll />} />
        <Route path="/bill/view:bill_id" element={<BillsAll />} />
        <Route path="/bill/create" element={<BillCreate />} />
        <Route path="/bill/simple" element={<BillSimple />} />
        <Route path="/bill/advanced" element={<BillAdvanced />} />

        <Route path="/groups/create" element={<GroupCreate />} />
        {/* 404 - Not Found route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
