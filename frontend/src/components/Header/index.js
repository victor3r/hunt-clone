import React from 'react';
import { Link } from 'react-router-dom';

import "./styles.css";

const Header = () => (
  <div id="main-div">
    <Link id="home" to={'/'}>
      <img
        height="30px"
        src="https://cdn4.iconfinder.com/data/icons/contact-us-19/48/83-512.png"
      />
    </Link>
    <header id="main-header"> JSHunt</header>
  </div>
);

export default Header;