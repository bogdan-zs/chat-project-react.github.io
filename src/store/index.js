import { createStore, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducer';
import rootSaga from './rootSaga';
import { routerMiddleware } from 'react-router-redux';
import history from '../history';

const sagaMiddleware = createSagaMiddleware();
const enhancer = applyMiddleware(sagaMiddleware, routerMiddleware(history), logger);
const store = createStore(reducers, enhancer);

sagaMiddleware.run(rootSaga);

window.store = store;

export default store;
