import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';

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
import GroupIndex from 'components/Groups/GroupIndex';
import GroupCreate from 'components/Groups/GroupCreate/GroupCreate';
import GroupsView from 'components/Groups/GroupsView/GroupsView';
import { AuthContext } from 'utility/hooks/useAuth';
import { useState } from 'react';
import { Logout } from 'components/AccountManagement/Logout';

const App = () => {
  const [token, setToken] = useState(window.localStorage.getItem('token') ?? '');
  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <BrowserRouter>
        <TopNavigation />
        <Routes>
          {/* <Route element={<ProtectedRoute />}> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* </Route> */}

          <Route element={<PrivateRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/bill/view/:bill_id" element={<BillsAll />} />
            <Route path="/bill/view" element={<BillsAll />} />
            <Route path="/bill/create" element={<BillCreate />} />
            <Route path="/bill/simple" element={<BillSimple />} />
            <Route path="/bill/advanced" element={<BillAdvanced />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/groups" element={<GroupIndex />} />
            <Route path="/groups/create" element={<GroupCreate />} />
            <Route path="/groups/view" element={<GroupsView />} />
          </Route>

          {/* 404 - Not Found route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
