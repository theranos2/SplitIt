import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';

import PublicRoute from 'components/Routes/RoutePublic';
import PrivateRoute from 'components/Routes/RoutePrivate';

import Login from 'components/AccountManagement/Login';
import Register from 'components/AccountManagement/Register';
import BillsAll from 'components/BillView/BillsAll';
import BillCreate from 'components/BillCreation/BillCreate';
import BillSimple from 'components/BillCreation/BillSimple';
import BillAdvanced from 'components/BillCreation/BillAdvanced';

import TopNavigation from 'components/Menu/TopNavigation';
import NotFound from 'components/NotFound';
import HomePage from 'components/HomePage';

const App = () => {
  return (
    <BrowserRouter>
      <TopNavigation />
      <Routes>
        <PublicRoute path="/" element={<HomePage />} />
        <PublicRoute restricted path="/login" element={<Login />} />
        <PublicRoute restricted path="/register" element={<Register />} />

        <PublicRoute path="/bill/view:bill_id" element={<BillsAll />} />
        <PrivateRoute path="/bill/view" element={<BillsAll />} />
        <PrivateRoute path="/bill/create" element={<BillCreate />} />
        <PrivateRoute path="/bill/simple" element={<BillSimple />} />
        <PrivateRoute path="/bill/advanced" element={<BillAdvanced />} />

        {/* 404 - Not Found route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
