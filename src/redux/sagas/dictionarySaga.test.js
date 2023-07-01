import { describe, expect, it } from 'vitest';
import watchFetchWordDefinition, {
	fetchWordDefinition,
} from './dictionarySaga';
import { call, put, takeEvery } from 'redux-saga/effects';
import {
	dictionaryWordFetched,
	errorFetchingDictionaryWord,
	fetchDictionaryWord,
} from '../slices/dictionarySlice';
import { runSaga } from 'redux-saga';
import { mockDictionaryOkResponse } from '../../mocks/dictionary/dictionaryResponses';
import { server } from '../../mocks/server';
import { faultyDictionaryHandlers } from '../../mocks/dictionary/dictionaryHandlers';
import * as api from '../../apis/dictionaryApi';

describe('dictionarySaga side-effects', () => {
	it('should wait for every fetchDictionaryWord.type action and call fetchWordDefinition', () => {
		const genObject = watchFetchWordDefinition();
		expect(genObject.next().value).toEqual(
			takeEvery(fetchDictionaryWord.type, fetchWordDefinition)
		);

		expect(genObject.next().done).toBeTruthy();
	});

	it('should call api.fetchWordDefinition with put dictionaryWordFetched', () => {
		const genObject = fetchWordDefinition({ payload: 'hello' });
		expect(genObject.next().value).toEqual(
			call(api.fetchWordDefinition, 'hello')
		);

		//* you need to specify the return from the call first to then expect
		const putResult = genObject.next(mockDictionaryOkResponse).value;
		expect(putResult).toEqual(
			put(dictionaryWordFetched(mockDictionaryOkResponse))
		);
		expect(genObject.next().done).toBeTruthy();
	});

	it('should put errorFetchingDictionaryWord with put errorFetchingDictionaryWord', () => {
		const genObject = fetchWordDefinition({ payload: 'hello' });
		expect(genObject.next().value).toEqual(
			call(api.fetchWordDefinition, 'hello')
		);

		var expectedErrorMessage =
			'Something went wrong while fetching dictionary.';

		expect(genObject.throw(new Error('saga error')).value).toEqual(
			put(errorFetchingDictionaryWord(expectedErrorMessage))
		);
	});
});

describe('dictionarySaga full saga', () => {
	it('should call API and dispatch success action', async () => {
		const dispatched = [];
		await runSaga(
			{
				dispatch: (action) => dispatched.push(action),
			},
			fetchWordDefinition,
			{ payload: 'hello' }
		).toPromise();

		expect(dispatched).toEqual([
			dictionaryWordFetched(mockDictionaryOkResponse),
		]);
	});

	it('should call API and dispatch error action', async () => {
		server.use(faultyDictionaryHandlers.internalServerError);

		const dispatched = [];
		await runSaga(
			{
				dispatch: (action) => dispatched.push(action),
			},
			fetchWordDefinition,
			{ payload: 'hello' }
		).toPromise();

		expect(dispatched).toEqual([
			errorFetchingDictionaryWord(
				'Something went wrong while fetching dictionary.'
			),
		]);
	});
});
