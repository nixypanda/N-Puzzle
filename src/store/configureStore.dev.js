import { createStore, applyMiddleware, compose } from 'redux';

import IndexReducer from '../IndexReducer';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import DevTools from '../utils/ReduxDevtools';

const enhancer = compose(
  // Middleware you want to use in development:
  applyMiddleware(reduxImmutableStateInvariant()),
  // Required! Enable Redux DevTools with the monitors you chose
  window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument()
);

/**
 * The setup for the one true store
 * @param  {object} initialState The initial state of the application
 * @return {object} The store representing the initial state
 */
export default function configureStore(initialState) {
  // Note: only Redux >= 3.1.0 supports passing enhancer as third argument.
  // See https://github.com/rackt/redux/releases/tag/v3.1.0
  const store = createStore(IndexReducer, initialState, enhancer);

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (module.hot) {
    module.hot.accept('../IndexReducer', () =>
      /* .default if you use Babel 6+ */
      store.replaceReducer(require('../IndexReducer'))
   );
  }

  return store;
}
