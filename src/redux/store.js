import {createStore} from 'redux';
import storage from 'redux-persist/lib/storage';
import {persistStore, persistReducer} from 'redux-persist';

//middlewares
import {composeWithDevTools} from 'redux-devtools-extension';


import rootReducer from './rootReducer';

/* istanbul ignore next */
const persistConfig = {
  key: 'root',
  storage,
}

/* istanbul ignore next */
const persistedReducer = persistReducer(persistConfig, rootReducer);

/* istanbul ignore next */
export const store = createStore(persistedReducer, composeWithDevTools());

/* istanbul ignore next */
export const persistor = persistStore(store);
