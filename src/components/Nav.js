import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import "./Nav.css";

class Navigator extends Component {
  render() {
    return (
      <nav>
        <ul>
          <li><NavLink to='/'>HOME</NavLink></li>
          <li><NavLink to='/addBrands'>BRANDS</NavLink></li>
          <li><NavLink to='/addProduct'>PRODUCTS</NavLink></li>
        </ul>
      </nav>
    )
  }
}

export default Navigator;
