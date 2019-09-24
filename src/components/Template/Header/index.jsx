import React from 'react';
import {Icon} from 'antd';
import { withRouter } from 'react-router-dom';
import SearchInput from './SearchInput';
import {browserRoutes} from '../../../consts/browserRoutes';
import './style.scss';

const Header = (props) => {
  const goToFeaturesPage = () => {
    props.history.push(browserRoutes.feature);
  };
  return (
    <div className='main-header'>
      <div className="logo-area">
        Admin Area
      </div>
      <div className="search">
        <SearchInput />
      </div>
      <div className="add">
        <Icon type={'plus'} onClick={goToFeaturesPage} />
      </div>
    </div>
  );
};

export default withRouter(Header);
