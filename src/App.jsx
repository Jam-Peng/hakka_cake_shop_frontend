import './styles/css/index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from './pages/Login';
import Product from './pages/Product';
import CheckOrder from './pages/checkout/CheckOrder';
import CheckOut from './pages/checkout/CheckOut';
import CheckDone from './pages/checkout/CheckDone';
import UserDashboard from './pages/user_profile/UserDashboard';
import UserAccount from './pages/user_profile/UserAccount';
import UserOrder from './pages/user_profile/UserOrder';

import AuthProvider from './context/AuthContext';
import ProductProvider from './context/ProductContext';
import CartProvider from './context/CartContext';
import CheckOutProvider from './context/CheckOutContext';
import UserProfileProvider from './context/UserProfileContext';

function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <ProductProvider>
            <UserProfileProvider>
              <CartProvider>
                <CheckOutProvider>
                  <Routes>
                    <Route path="/" element={<Dashboard />}>
                      <Route index element={<Home />}/>
                      <Route path="/login" element={<Login />}/>
                      <Route path="/product" element={<Product />}/>
                      <Route path="/check_order" element={<CheckOrder />}/>
                      <Route path="/check_out" element={<CheckOut />}/>
                      <Route path="/check_done" element={<CheckDone />} />
                      <Route path="/user_profile" element={<UserDashboard />}>
                        <Route index element={<UserAccount />} />
                        <Route path="/user_profile/user_order" element={<UserOrder />}/>
                      </Route>
                    </Route>

                    <Route path="*" element={<NotFound />}/>
                  </Routes>
                </CheckOutProvider>
              </CartProvider>
            </UserProfileProvider>
          </ProductProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
