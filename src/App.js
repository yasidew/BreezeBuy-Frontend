import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Inventory from './pages/inventory';
import ManageInventory from './pages/manageinventory';
import AdminDashboard from './pages/AdminDashboard';
import PrivateRoute from './components/PrivateRoute';
import CreateVendor from './pages/CreateVendor';
import AssignRole from './pages/AssignRole';
import VendorDashboard from './pages/VendorDashboard';
import AddVendor from './pages/AddVendor';
import UpdateVendor from './pages/UpdateVendor';
import CustomerDashboard from './pages/CustomerDashboard';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddFeedback from './pages/AddFeedback';
import UpdateFeedback from './pages/UpdateFeedback';
import UserProfile from './pages/UserProfile';
import CSRUserPage from './pages/CSRUserPage';
import AdminVendorRankingPage from './pages/AdminVendorRankingPage';

function App() {
  return (
    <Router>
      <Layout>
        <ToastContainer />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/inventory/add" element={<ManageInventory />} />
          <Route path="/inventory/edit/:id" element={<ManageInventory />} />
          <Route path="/user-profile" element={<UserProfile />} />

          <Route element={<PrivateRoute role="Admin" />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin-assign" element={<AssignRole />} />
            <Route path="/create-vendor" element={<CreateVendor />} />
            <Route path="/admin-vendor" element={<AdminVendorRankingPage />} />
          </Route>

          <Route element={<PrivateRoute role="Vendor" />}>
            <Route path="/vendor-dashboard" element={<VendorDashboard />} />
            <Route path="/add-vendor-details" element={<AddVendor />} />
            <Route path="/update-vendor/:id" element={<UpdateVendor />} />
          </Route>

          <Route element={<PrivateRoute role="Customer" />}>
            <Route path="/customer-dashboard" element={<CustomerDashboard />} />
            <Route path="/comment/:vendorId" element={<AddFeedback />} />
            <Route path="/vendor/:vendorId/feedback/edit/:commentId" element={<UpdateFeedback />} />
          </Route>

          <Route element={<PrivateRoute role="CSR" />}>
            <Route path="/csr-users-page" element={<CSRUserPage />} />
          </Route>
        </Routes>

      </Layout>

    </Router>
  );
}

export default App;
