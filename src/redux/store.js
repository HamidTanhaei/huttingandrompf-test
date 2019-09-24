import {createStore} from 'redux';
import storage from 'redux-persist/lib/storage';

//middlewares
import {composeWithDevTools} from 'redux-devtools-extension';


import rootReducer from './rootReducer';

/* istanbul ignore next */
const persistConfig = {
  key: 'root',
  storage,
}


/* istanbul ignore next */
export const store = createStore(rootReducer, composeWithDevTools());
