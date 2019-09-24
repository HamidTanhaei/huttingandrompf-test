import React from 'react';
import axios from 'axios';
import {Route} from 'react-router-dom';
import Template from './components/Template';

//Route Components
import Listing from './components/Listing';

import {browserRoutes} from './consts/browserRoutes';


axios.defaults.baseURL = `${process.env.REACT_APP_API_BASE_PATH}`;

const Routes = (props) => {
  return (
    <Template>
      <Route path={browserRoutes.home} exact component={Listing} />
      <Route path={browserRoutes.listing} component={Listing} />
    </Template>
  );
};

export default Routes;
