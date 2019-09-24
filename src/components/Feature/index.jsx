import React from 'react';
import Header from '../Template/Header';
import {Icon} from 'antd';
import './style.scss';

const Feature = (props) => {
  return (
    <div className='feature-page'>
      <Header title='Feature Page'>
        <div className="go-back">
          <Icon type={'left'} onClick={props.history.goBack} />
        </div>
      </Header>
      <div className='wrapper'>
        <div className='hello'>
          Hello, Im Feature Page
        </div>
      </div>
    </div>
  );
};

export default Feature;
