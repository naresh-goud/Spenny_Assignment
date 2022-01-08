import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {

  return (
    <nav className="main-nav">
      <ul>
        <li><NavLink to='/space' activeClassName='active'>Space</NavLink></li>
        <li><NavLink to='/nature' activeClassName='active'>Nature</NavLink></li>
        <li><NavLink to='/buildings' activeClassName='active'>Buildings</NavLink></li>
        <li><NavLink to='/cookies' activeClassName='active'>Cookies</NavLink></li>
        <li><NavLink to='/cats' activeClassName='active'>Cats</NavLink></li>
        <li><NavLink to='/jogging' activeClassName='active'>Jogging</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navigation;