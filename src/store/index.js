import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/index";
import rootReduser from './redusers/index';

const sagaMiddleWare = createSagaMiddleware();

const store = compose(
    applyMiddleware(sagaMiddleWare),
)(createStore)(rootReduser, composeWithDevTools())

sagaMiddleWare.run(rootSaga);

const persistor = persistStore(store)

export { store, persistor };

