import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';

import ProtectedRoute from 'components/Routes/RouteProtected';
import PrivateRoute from 'components/Routes/RoutePrivate';

import Login from 'components/AccountManagement/Login';
import Register from 'components/AccountManagement/Register';
import BillsAll from 'components/BillView/BillsAll';
import BillCreate from 'components/BillCreation/BillCreate';
import BillSimple from 'components/BillCreation/BillSimple';
import BillAdvanced from 'components/BillCreation/BillAdvanced';
import Notifications from 'components/Notifications/NotificationsPage';

import TopNavigation from 'components/Menu/TopNavigation';
import NotFound from 'components/NotFound';
import HomePage from 'components/HomePage';

const App = () => {
  return (
    <BrowserRouter>
      <TopNavigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* <Route element={<PrivateRoute />}> */}
        <Route path="/bill/view:bill_id" element={<BillsAll />} />
        <Route path="/bill/view" element={<BillsAll />} />
        <Route path="/bill/create" element={<BillCreate />} />
        <Route path="/bill/simple" element={<BillSimple />} />
        <Route path="/bill/advanced" element={<BillAdvanced />} />
        <Route path="/notifications" element={<Notifications />} />
        {/* </Route> */}

        {/* 404 - Not Found route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
