import React from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';

const Header = ({ isAuth, login, logout }) => {
  return (
    <header>
      <div>
        {isAuth ? (
          <div>
            {login} <button onClick={logout}>Log Out</button>
          </div>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
