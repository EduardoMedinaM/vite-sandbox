import { mockDictionaryOkResponse } from '../../mocks/dictionary/dictionaryResponses';
import store from '../store';
import {
	dictionaryWordFetched,
	errorFetchingDictionaryWord,
	fetchDictionaryWord,
} from './dictionarySlice';
import { it, describe, expect } from 'vitest';

describe('dictionarySlice', () => {
	it('should initially set default dictionary state', () => {
		const state = store.getState().dictionary;
		expect(state).toEqual({
			isLoading: false,
			error: null,
			dictionaryWord: [],
		});
	});

	it('should update state when fetchDictionaryWord is dispatched', () => {
		store.dispatch(fetchDictionaryWord('hello'));
		const state = store.getState().dictionary;
		expect(state).toEqual({
			isLoading: true,
			error: null,
			dictionaryWord: [],
		});
	});

	it('should update state when dictionaryWordFetched is dispatched', () => {
		store.dispatch(dictionaryWordFetched(mockDictionaryOkResponse));
		const state = store.getState().dictionary;
		expect(state).toEqual({
			isLoading: false,
			error: null,
			dictionaryWord: mockDictionaryOkResponse,
		});
	});

	it('should update state when errorFetchingDictionaryWord is dispatched', () => {
		const expectedError = 'Test error';
		store.dispatch(errorFetchingDictionaryWord(expectedError));
		const state = store.getState().dictionary;
		expect(state).toEqual({
			isLoading: false,
			error: expectedError,
			dictionaryWord: [],
		});
	});
});
