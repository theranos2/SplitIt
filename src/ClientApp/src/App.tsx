import { useState } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';
import { AuthContext } from 'utility/hooks/useAuth';

import PrivateRoute from 'components/Routes/RoutePrivate';
import ProtectedRoute from 'components/Routes/RouteProtected';

import Login from 'components/AccountManagement/Login';
import Register from 'components/AccountManagement/Register';
import { Logout } from 'components/AccountManagement/Logout';
import BillAdvanced from 'components/BillCreation/BillAdvanced';
import BillDetailed from 'components/BillView/BillDetailed';
import BillCreate from 'components/BillCreation/BillCreate';
import BillSimple from 'components/BillCreation/BillSimple';
import BillsAll from 'components/BillView/BillsAll';
import BillEdit from 'components/BillModify/BillEdit';
import BillJoin from 'components/BillModify/BillJoin';
import BillShare from 'components/BillModify/BillShare';
import BillPay from 'components/BillModify/BillPay';
import Notifications from 'components/Notifications/NotificationsPage';

import TopNavigation from 'components/Menu/TopNavigation';
import NotFound from 'components/NotFound';
import HomePage from 'components/HomePage';
import GroupIndex from 'components/Groups/GroupIndex';
import GroupCreate from 'components/Groups/GroupCreate';
import GroupsView from 'components/Groups/GroupsView';
import GroupDetailed from 'components/Groups/GroupDetailed';
import Graph from 'components/Insights/Graph';
import { AddCardPage, BankingIndex, ViewCardPage } from 'components/Banking';
import { AddAddressPage } from 'components/Banking/AddAddress';

const App = () => {
  const [token, setToken] = useState(window.localStorage.getItem('token') ?? '');
  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <BrowserRouter>
        <TopNavigation />
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/logout" element={<Logout />} />
            <Route path="/bill/view" element={<BillsAll />} />
            <Route path="/bill/view/:bill_id" element={<BillDetailed />} />
            <Route path="/bill/edit/:bill_id" element={<BillEdit />} />
            <Route path="/bill/join/:bill_id" element={<BillJoin />} />
            <Route path="/bill/share/:bill_id" element={<BillShare />} />
            <Route path="/bill/pay/:bill_id" element={<BillPay />} />
            <Route path="/bill/create" element={<BillCreate />} />
            <Route path="/bill/simple" element={<BillSimple />} />
            <Route path="/bill/advanced" element={<BillAdvanced />} />
            <Route path="/groups" element={<GroupIndex />} />
            <Route path="/groups/create" element={<GroupCreate />} />
            <Route path="/groups/view" element={<GroupsView />} />
            <Route path="/groups/view/:group_id" element={<GroupDetailed />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/banking" element={<BankingIndex />} />
            <Route path="/banking/card/add" element={<AddCardPage />} />
            <Route path="/banking/card" element={<ViewCardPage />} />
            <Route path="/banking/address/add" element={<AddAddressPage />} />
            <Route path="/analytics" element={<Graph />} />
          </Route>

          {/* 404 - Not Found route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
