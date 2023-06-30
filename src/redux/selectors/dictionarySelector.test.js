import { describe, expect, it } from 'vitest';
import { mockDictionaryOkResponse } from '../../mocks/dictionary/dictionaryResponses';
import { selectDefinition, selectDictionary } from './dictionarySelector';

describe('dictionarySelector', () => {
	const dictionaryDefaultState = {
		isLoading: false,
		error: null,
		dictionaryWord: [],
	};

	const getReduxState = (dictionary) => ({
		dictionary: { ...dictionary },
	});

	it('should get the dictionary state', () => {
		const result = selectDictionary(getReduxState(dictionaryDefaultState));
		expect(result).toEqual(dictionaryDefaultState);
	});

	it('should get state fallback value when state is null or undefined', () => {
		const resultFromNull = selectDictionary(null);
		expect(resultFromNull).toEqual({});

		const resultFromUndefined = selectDictionary(undefined);
		expect(resultFromUndefined).toEqual({});
	});

	it('should get the definition from dictionary state', () => {
		const expectedDefinition =
			'used as a greeting or to begin a phone conversation.';

		const result = selectDefinition(
			getReduxState({
				...dictionaryDefaultState,
				dictionaryWord: mockDictionaryOkResponse,
			})
		);
		expect(result).toBe(expectedDefinition);
	});

	it('should get definition fallback value when state is null or undefined', () => {
		const expectedDefinition = 'Definition not found.';

		const resultFromStateNull = selectDefinition(null);
		expect(resultFromStateNull).toBe(expectedDefinition);

		const resultFromNull = selectDefinition(getReduxState(null));
		expect(resultFromNull).toBe(expectedDefinition);

		const resultFromUndefined = selectDefinition(getReduxState(undefined));
		expect(resultFromUndefined).toBe(expectedDefinition);
	});
});
