import React from 'react';
import {Route} from 'react-router-dom';
import Template from './components/Template';

import {browserRoutes} from './consts/browserRoutes';



const Routes = (props) => {
  return (
    <Template>
      <Route path={browserRoutes.home} component={(props) => 'home'} />
    </Template>
  );
};

export default Routes;
