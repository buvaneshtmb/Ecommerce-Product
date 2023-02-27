import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AdminDashboard from './components/Admin/AdminDashboard'
import UserDashboard from './components/UserDashboard';
import SignUp from './components/SignUp'
import Login from './components/Login'
import Collection from './components/Collection'
import Orders from './components/Orders'
import ProductDetails from './components/ProductDetails'
import AddProduct from './components/Admin/AddProduct';
import AddUser from './components/Admin/AddUser';
import EditProduct from './components/Admin/EditProduct'
import EditUser from './components/Admin/EditUser'
import AdminOrders from './components/Admin/AdminOrders'
import Product from './components/Admin/Product'
import Pagination from './components/Pagination';
import ProfilePage from './components/Profile';

import User from './components/Admin/User';
import Cart from './components/Cart';
import Favourite from './components/Favourite';
import { ToastContainer } from "react-toastify";
import EmailVerify from './components/EmailVerify';
// import Notify from './components/Notify';

function App() {
  return <>
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<SignUp />} />
        <Route path='/admin-dashboard' element={<AdminDashboard />} />
        <Route path='/user-dashboard' element={<UserDashboard />} />
        <Route path='/collections' element={<Collection />} />
        <Route path='/productdetails/:id' element={<ProductDetails />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/favourite' element={<Favourite />} />
        <Route path='/product' element={<Product />} />
        <Route path='/user' element={<User />} />
        <Route path='/add-product' element={<AddProduct />} />
        <Route path='/add-user' element={<AddUser />} />
        <Route path='/edit-product/:id' element={<EditProduct />} />
        <Route path='/edit-user/:id' element={<EditUser />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/adminorders' element={<AdminOrders />} />
        <Route path='*' element={<Navigate to={'/collections'} />} />
        <Route path='/page' element={<Pagination />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/users/:id/verify/:token' element={<EmailVerify />} />
      </Routes>
      <ToastContainer
        autoClose={2000} />
    </BrowserRouter>
  </>
}

export default App;



