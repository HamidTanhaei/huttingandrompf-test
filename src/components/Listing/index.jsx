import React from 'react';
import {Icon} from 'antd';
import {withRouter} from 'react-router-dom';
import FeaturesTable from './FeaturesTable';
import SearchInput from './SearchInput';
import Header from '../Template/Header';
import {browserRoutes} from '../../consts/browserRoutes';
import './style.scss';

const Home = (props) => {
  const goToFeaturesPage = () => {
    props.history.push(browserRoutes.feature);
  };
  return (
    <div className='listing-page'>
      <Header title='Admin Area'>
        <div className="search">
          <SearchInput />
        </div>
        <div className="add">
          <Icon type={'plus'} onClick={goToFeaturesPage} />
        </div>
      </Header>
      <div className="wrapper">
        <FeaturesTable />
      </div>
    </div>
  );
};

export default withRouter(Home);
