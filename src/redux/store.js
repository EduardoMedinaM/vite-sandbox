import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';

//import createSagaMiddleware from 'redux-saga';

//const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  //middleware: [sagaMiddleware],
});

//sagaMiddleware.run(rootSaga);

export default store;
