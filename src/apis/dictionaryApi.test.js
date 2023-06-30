import { describe, expect, it } from 'vitest';
import * as api from './dictionaryApi';

describe('Dictionary API', () => {
	//* Test success responses due to the redux-saga will handle the
	//* exceptions with Axios
	it('fetchWordDefinition OK ', async () => {
		const result = await api.fetchWordDefinition('hello');
		expect(result[0].meanings[0].definitions[0].definition).toBe(
			'used as a greeting or to begin a phone conversation.'
		);
	});
});
