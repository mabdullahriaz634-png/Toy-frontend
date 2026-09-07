import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import './App.css'
import Profile from './components/Profile'
import VerifyEmail from './components/VerifyEmail'
import Navbar from './components/Navbar'
import MainLayout from './components/MainLayout'
import Home from './pages/Home'
import ProductDetail from './components/ProductDetail'
import ProductReview from './components/ProductReview'
import SignupPage from './components/Signup';
import Login from './components/Login'
import ResetPassword from './components/ResetPassword';
import CartSidebar from './components/CartSideBar';
import UserDashboard from './components/MainUserDashboard';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import FilterSidebar from './components/nnnn';
import OrderDetailPage from './components/OrderDetail';
import StripeCancelPage from './components/PaymentCancel';
import PaymentCancel from './components/PaymentCancel';
import PaymentSuccess from './components/PaymentSuccess';
import OrdersTab from './components/MyOrderTab';
import AdminDashboard from "./components/AdminFolder/AdminDashboard";
import AdminOverview from "./components/AdminFolder/AdminOverview";
import AdminOrders from "./components/AdminFolder/AdminOrders";
import AdminProducts from "./components/AdminFolder/AdminProducts";
import AdminCustomers from "./components/AdminFolder/AdminCustomers";
import AdminMainLayout from './components/AdminFolder/AdminMainLayout';
import AdminProtected from './components/AdminFolder/AdminProtected';
import AdminOrderDetailPage from './components/AdminFolder/AdminOrderDetail';
import CheckoutPage from './components/Checkout';


function App() {
  return (
    <>
      <ToastContainer position='top-center' />
      <Routes>
        {/* ================= USER ROUTES ================= */}

        <Route path='/' element={<MainLayout />} >
          <Route index element={<Home />} />
          <Route path='/detail/:id' element={<ProductDetail />} />
          <Route path='/checkout' element={<CheckoutPage/>} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/verify-email' element={<VerifyEmail />} />
          <Route path='/forgotpassword' element={<ResetPassword />} />
          <Route path='/login' element={<Login />} />
          
          <Route path='/profile' element={<AdminProtected role={'user'}>
            <Profile />
          </AdminProtected>} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/dashboard' element={<UserDashboard />} />
          <Route path='/dashboard/order-detail/:id' element={<OrderDetailPage />} />
          <Route path='/payment/cancel' element={<PaymentCancel />} />
          <Route path='/payment/success' element={<PaymentSuccess />} />
          <Route path="/orders" element={<OrdersTab />} />
        </Route >

        {/* ================= ADMIN ROUTES ================= */}
        <Route path="/admin" element={<AdminProtected role={'admin'}>
          <AdminMainLayout />
        </AdminProtected>}>
          <Route index element={<AdminOverview />} />
          <Route path="/admin/orders/:id" element={<AdminOrderDetailPage />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="*" element={<AdminOverview />} />
        </Route>
      </Routes>


      {/* //////////// */}
      {/* <BrowserRouter> */}
      {/* <Routes>
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminOverview />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
        </Route>
      </Routes> */}
      {/* </BrowserRouter> */}

      {/* <ContactUs/> */}
      {/* <FilterSidebar/> */}

      {/* <OrderDetailPage /> */}
    </>
  )
}

export default App
