import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import dictionaryReducer from './slices/dictionarySlice';

import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
	reducer: {
		counter: counterReducer,
		dictionary: dictionaryReducer,
	},
	middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
