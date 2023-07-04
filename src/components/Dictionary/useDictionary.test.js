import { renderHook, act } from '@testing-library/react';
import useDictionary from './useDictionary';
import { ReduxProvider } from '../../utils/testWrappers';
import { it, describe, expect } from 'vitest';

describe('useDictionary', () => {
	it('should return default values', () => {
		const { result } = renderHook(() => useDictionary(), {
			wrapper: ReduxProvider,
		});

		expect(result.current.wordDefinition).toBe('Definition not found.');
		expect(result.current.isSubmitDisabled).toBeFalsy();

		const formik = result.current.formik;

		expect(formik.values).toEqual({ word: '' });
		expect(formik.errors).toEqual({});
		expect(formik.touched).toEqual({});
		expect(typeof formik.handleSubmit).toBe('function');
	});

	it('should update the wordDefinition when formik changes and submits values', async () => {
		const { result } = renderHook(() => useDictionary(), {
			wrapper: ReduxProvider,
		});

		await act(async () => {
			await result.current.formik.setValues({ word: 'hello' });
		});

		expect(result.current.isSubmitDisabled).toBeFalsy();

		await act(async () => {
			await result.current.formik.submitForm();
		});

		expect(result.current.wordDefinition).toBe(
			'used as a greeting or to begin a phone conversation.'
		);
	});

	it('should set errors when formik changes to a invalid value', async () => {
		const { result } = renderHook(() => useDictionary(), {
			wrapper: ReduxProvider,
		});

		await act(async () => {
			await result.current.formik.setValues({ word: '123' });
		});

		expect(result.current.isSubmitDisabled).toBeTruthy();
		expect(result.current.formik.errors).toBeTruthy({
			word: 'Word only can accept letters',
		});

		const wordLimitExceeded = Array.from(Array(31)).reduce(
			(prev) => `${prev}a`,
			''
		);

		await act(async () => {
			await result.current.formik.setValues({ word: wordLimitExceeded });
		});

		expect(result.current.isSubmitDisabled).toBeTruthy();
		expect(result.current.formik.errors).toBeTruthy({
			word: 'Word cannot be more than 30 characters long',
		});
	});
});
