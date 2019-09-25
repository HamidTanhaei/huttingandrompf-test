import {createStore} from 'redux';

//middlewares
import {composeWithDevTools} from 'redux-devtools-extension';


import rootReducer from './rootReducer';


/* istanbul ignore next */
export const store = createStore(rootReducer, composeWithDevTools());
