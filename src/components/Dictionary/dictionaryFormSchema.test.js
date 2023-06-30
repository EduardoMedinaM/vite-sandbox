import { describe, expect, it } from 'vitest';
import * as schema from './dictionaryFormSchema';

describe('dictionaryFormSchema', () => {
	it('should not validate word is required', async () => {
		expect(await schema.default.isValid('word', { word: null })).toBeFalsy();
		expect(
			await schema.default.isValid('word', { word: undefined })
		).toBeFalsy();
		expect(await schema.default.isValid('word', { word: '' })).toBeFalsy();
	});

	it('should not validate word with a max of 30 letters', async () => {
		const wordLimitExceeded = Array.from(Array(31)).reduce(
			(prev) => `${prev}a`,
			''
		);
		expect(
			await schema.default.isValid('word', { word: wordLimitExceeded })
		).toBeFalsy();
	});

	it('should not validate word with numbers and/or special characters', async () => {
		expect(await schema.default.isValid('word', { word: '123' })).toBeFalsy();

		expect(
			await schema.default.isValid('word', { word: "@';';'" })
		).toBeFalsy();

		expect(
			await schema.default.isValid('word', { word: "123@';';'" })
		).toBeFalsy();

		expect(
			await schema.default.isValid('word', { word: "hello123@';';'world" })
		).toBeFalsy();
	});

	it('should validate word', async () => {
		expect(await schema.default.isValid('word', { word: 'h' })).toBeFalsy();
		expect(await schema.default.isValid('word', { word: 'hello' })).toBeFalsy();

		const wordLimit = Array.from(Array(30)).reduce((prev) => `${prev}a`, '');
		expect(
			await schema.default.isValid('word', { word: wordLimit })
		).toBeFalsy();
	});
});
