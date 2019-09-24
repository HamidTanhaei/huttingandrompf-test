import React from 'react';
import {Router} from 'react-router-dom';
import history from './utils/history';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import RoutesConnectedToRedux from './Routes';


// css
import 'antd/dist/antd.css';
import './theme/global.scss';

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <RoutesConnectedToRedux />
      </Router>
    </Provider>
  );
}

export default App;
