import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import './App.css';

import GroupCreate from './Components/Groups/GroupCreate';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/groups/create" element={<GroupCreate />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
