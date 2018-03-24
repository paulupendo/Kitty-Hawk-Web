import React from 'react';

// styles
import './Header.css';

const image = `https://res.cloudinary.com/dn0czddtv/image/upload/v1521724178/Cylance_main_logo.png`;

const Header = () => {
  return (
    <div className="header-container">
      <img src={image} alt="logo" />
    </div>
  );
};

export default Header;
