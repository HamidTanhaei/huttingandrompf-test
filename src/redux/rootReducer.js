import {combineReducers} from 'redux';
import filter from './filter/reducer';

const reducers = {
  filter,
};

export default combineReducers(reducers);
