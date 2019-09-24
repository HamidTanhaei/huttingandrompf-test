import React from 'react';
import axios from 'axios';
import {Route} from 'react-router-dom';
import Template from './components/Template';

//Route Components
import Home from './components/Home';

import {browserRoutes} from './consts/browserRoutes';


const Routes = (props) => {
  return (
    <Template>
      <Route path={browserRoutes.home} component={Home} />
    </Template>
  );
};

export default Routes;
