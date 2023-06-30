import { call, put, takeEvery } from 'redux-saga/effects';
import {
	dictionaryWordFetched,
	errorFetchingDictionaryWord,
	fetchDictionaryWord,
} from '../slices/dictionarySlice';
import * as api from '../../apis/dictionaryApi';

export function* fetchWordDefinition({ payload }) {
	try {
		const dictionaryWord = yield call(api.fetchWordDefinition, payload);
		yield put(dictionaryWordFetched(dictionaryWord));
	} catch (err) {
		var errorMessage = 'Something went wrong while fetching dictionary.';
		// TODO:
		//! trigger global alert
		//! error boundary
		yield put(errorFetchingDictionaryWord(errorMessage));
	}
}

export default function* watchFetchWordDefinition() {
	yield takeEvery(fetchDictionaryWord.type, fetchWordDefinition);
}
