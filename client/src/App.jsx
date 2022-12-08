import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductList from './pages/ProductList'
import Product from './pages/Product'
import Register from './pages/Register'
import Login from './pages/Login'
import Cart from './pages/Cart'
import Pay from './Pay';
import Success from './Success'

const App = () => {
  const user = true;
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/products/:category" element={<ProductList />}></Route>
          <Route path="/product/:id" element={<Product />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/login" element={user ? <Home /> : <Login />}></Route>
          <Route path="/register" element={user ? <Home /> : <Register />}></Route>
          <Route path="/pay" element={<Pay />}></Route>
          <Route path="/success" element={<Success />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
};

export default App;