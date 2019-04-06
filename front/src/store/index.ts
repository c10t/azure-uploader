import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'

import rootReducer from '../ducks'
import rootSaga from '../sagas'

const configureStore = () => {
  const saga = createSagaMiddleware()
  const store = createStore(rootReducer, applyMiddleware(saga, logger))
  saga.run(rootSaga)
  return store
}

export default configureStore
