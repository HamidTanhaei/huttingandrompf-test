import React from 'react';
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import {store, persistor} from './redux/store';


function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        hellow world
      </PersistGate>
    </Provider>
  );
}

export default App;
