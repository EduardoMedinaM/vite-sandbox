import { all } from 'redux-saga/effects';
import dictionarySaga from './dictionarySaga';

export function* rootSaga() {
	yield all([dictionarySaga()]);
}
