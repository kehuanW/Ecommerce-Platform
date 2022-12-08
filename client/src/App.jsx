import { BrowserRouter as Router, Route, Switch, } from "react-router-dom";
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
      <Router>
        <Switch>
          <Route path="/" exact component={Home}>
          </Route>
          <Route path="/products" component={ProductList}></Route>
          <Route path="/product" component={Product}></Route>
          <Route path="/cart" component={Cart}></Route>
          <Route path="/login" component={user ? Home : Login}></Route>
          <Route path="/register" component={user ? Home : Register}></Route>
          <Route path="/pay" component={Pay}></Route>
          <Route path="/success" component={Success}></Route>
        </Switch>
      </Router>
    </div>
  )
};

export default App;