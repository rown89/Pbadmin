import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navigator from "./components/Nav";
import Footer from "./components/Footer";
import Home from './components/Home';
import Products from './components/Products';
import Brands from './components/Brands';
import AddBrand from './components/AddBrand'
import AddProduct from './components/AddProduct'
import "./App.css";

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <div className="App">
          <header>
            <div className='logoContainer'>
              <div className='logo'>
                <img alt='' src="http://localhost:3000/assets/img/logo.png" />
              </div>
            </div>
          </header>
          <Navigator />
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/Product" component={Products} />
            <Route path="/AddProduct" component={AddProduct} />
            <Route path="/Brands" component={Brands} />
            <Route path="/AddBrand" component={AddBrand} />
          </Switch>
          <Footer />
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
