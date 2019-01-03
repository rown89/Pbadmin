import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import "./Nav.css";

class Navigator extends Component {
  render() {
    return (
      <nav>
        <ul>
          <li><NavLink to='/'>HOME</NavLink></li>
          <li><NavLink to='/Brands'>BRANDS</NavLink>
            <ul>
              <li>
                <NavLink to='/addBrand'>Add Brand</NavLink>
              </li>
            </ul>
          </li>
          <li><NavLink to='/Product'>PRODUCTS</NavLink>
            <ul>
              <li>
                <NavLink to='/addProduct'>Add Product</NavLink>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    )
  }
}

export default Navigator;
