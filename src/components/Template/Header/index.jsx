import React from 'react';
import './style.scss';

const Header = (props) => {
  return (
    <div className='main-header'>
      <div className="logo-area">
        {props.title}
      </div>
      {props.children}
    </div>
  );
};

export default Header;
