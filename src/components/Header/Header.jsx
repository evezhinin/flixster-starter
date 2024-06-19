import React from 'react';
import "./Header.css"

const Header = () => {
  return (
    <div className={"header"}>
      <div className={'gradientOverlay'}></div>
      <h1 className={'title'}>Flixster</h1>
    </div>
  );
};

export default Header;