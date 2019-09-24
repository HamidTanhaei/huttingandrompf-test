import actions from './actionsList';
export default (state = {}, action) => {
  switch (action.type) {
  case actions.SET_TEXT:
    return Object.assign({}, state, {text: action.text})
    case actions.REMOVE_TEXT:
      const newStates = Object.assign({}, state);
      delete newStates['text'];
      return newStates;
  default:
    return state;
  }
};
