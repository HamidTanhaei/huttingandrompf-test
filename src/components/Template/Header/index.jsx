import React from 'react';
import {Icon} from 'antd';
import SearchInput from './SearchInput';
import './style.scss';

const Header = (props) => {
  return (
    <div className='main-header'>
      <div className="logo-area">
        Admin Area
      </div>
      <div className="search">
        <SearchInput />
      </div>
      <div className="add">
        <Icon type={'plus'} />
      </div>
    </div>
  );
};

export default Header;
