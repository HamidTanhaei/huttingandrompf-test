import React from 'react';
import {Router} from 'react-router-dom';
import history from './utils/history';
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import {store, persistor} from './redux/store';
import RoutesConnectedToRedux from './Routes';


// css
import 'antd/dist/antd.css';
import './theme/global.scss';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router history={history}>
          <RoutesConnectedToRedux />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
