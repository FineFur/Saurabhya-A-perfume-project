import { Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";

import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import About from "./pages/About/About";
import Cart from "./pages/Cart/Cart";
import ProductDetails from "./pages/Product/ProductDetails";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Account from "./pages/Account/Account";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Checkout from "./pages/Checkout/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation/OrderConfirmation";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={ <ProtectedRoute> <Account /> </ProtectedRoute> } />
        <Route path="/checkout" element={ <ProtectedRoute> <Checkout /> </ProtectedRoute> } />
        <Route path="/order-confirmation" element={ <ProtectedRoute> <OrderConfirmation /> </ProtectedRoute> } />
      </Routes>
    </>
  );
}

export default App;