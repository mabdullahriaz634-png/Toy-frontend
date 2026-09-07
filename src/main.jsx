import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './Context/authContext.jsx'
import CartProvider from './Context/cartContext.jsx'
import OrderProvider from './Context/orderContext.jsx'
import AdminOrderProvider from './components/AdminFolder/Context/AdminOrderContext.jsx'
import HomeProvider from './Context/HomeContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    {/* <StrictMode> */}

    <AuthProvider>
      <HomeProvider>
        <CartProvider>
          <OrderProvider>
            <AdminOrderProvider>
              <App />
            </AdminOrderProvider>
          </OrderProvider>
        </CartProvider>
      </HomeProvider>
    </AuthProvider>

    {/* </StrictMode> */}
  </BrowserRouter>
)
