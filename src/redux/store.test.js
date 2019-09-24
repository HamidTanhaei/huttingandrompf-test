import {store, persistor} from './store';

describe('Redux store', () => {
  it('should make store', () => {
    expect(store.dispatch).not.toBeNull();
  });
  it('should make persistor', () => {
    expect(persistor.dispatch).not.toBeNull();
  });
});
