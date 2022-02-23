import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import reducers from '../reducers';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

// the logger master switch
const USE_LOGGING = false

// create the logger
const logger = createLogger({
  predicate: (getState, { type }) => USE_LOGGING
})

const persistConfig = {
  key: 'login',
  storage: storage,
  whitelist: ['login'] // which reducer want to store
};
const pReducer = persistReducer(persistConfig, reducers);
  const middleWares = [logger, thunk]
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    pReducer,
    composeEnhancers(applyMiddleware(...middleWares))
  )

const persistor = persistStore(store);
export { persistor, store };




