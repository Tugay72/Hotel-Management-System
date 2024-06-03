import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/homepage">Home</Link></li>
        <li><Link to="/loginpage">Login</Link></li>
      </ul>
    </nav>
  );
};

export default Navigation;