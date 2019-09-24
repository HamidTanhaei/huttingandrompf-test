import React from 'react';
import axios from 'axios';
import {Route} from 'react-router-dom';

//Route Components
import ListingPage from './components/Listing';
import FeaturePage from './components/Feature';

import {browserRoutes} from './consts/browserRoutes';


axios.defaults.baseURL = `${process.env.REACT_APP_API_BASE_PATH}`;

const Routes = (props) => {
  return (
    <>
      <Route path={browserRoutes.home} exact component={ListingPage} />
      <Route path={browserRoutes.listing} component={ListingPage} />
      <Route path={browserRoutes.feature} component={FeaturePage} />
    </>
  );
};

export default Routes;
