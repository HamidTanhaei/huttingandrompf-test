import * as actions from './action';
import reducer from './reducer';

describe('Redux user reducer', () => {
  it('should update state', () => {
    expect(reducer({}, actions.setUserToken('myToken'))['token']).toBe('myToken');
  });
});
