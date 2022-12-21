import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductList from './pages/ProductList';
import Product from './pages/Product';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Success from './pages/CheckoutSuccess';
import Failure from './pages/CheckoutFailure';
import MyModal from './pages/Modal'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/products" element={<ProductList />}></Route>
          {/* <Route path="/products/:category" element={<ProductList />}></Route> */}
          <Route path="/product/:id" element={<Product />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/success" element={<Success />}></Route>
          <Route path="/failure" element={<Failure />}></Route>
          <Route path="/modal" element={<MyModal />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
};

export default App;