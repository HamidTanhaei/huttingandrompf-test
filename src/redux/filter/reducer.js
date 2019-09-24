import actions from './actionsList';
export default (state = {}, action) => {
  switch (action.type) {
  case actions.SET_TEXT:
    return Object.assign({}, state, {text: action.text});
  default:
    return state;
  }
};
