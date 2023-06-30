import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Dictionary from './';
import userEvent from '@testing-library/user-event';
import { ReduxProvider } from '../../utils/testWrappers';
import { server } from '../../mocks/server';
import { faultyDictionaryHandlers } from '../../mocks/dictionary/dictionaryHandlers';

describe('Dictionary', () => {
	const getComponent = (props = {}) => <Dictionary {...props} />;

	it('should render', () => {
		render(getComponent(), { wrapper: ReduxProvider });
		expect(screen.getByRole('textbox', { name: /word/i })).toBeInTheDocument();

		const submitButton = screen.getByRole('button', { name: /submit/i });
		expect(submitButton).toBeInTheDocument();

		/*
		 * * Formik enables/disables the submit button
		 * * even before the API call. So, it's safe to have it enabled the first time
		 */
		expect(submitButton).toBeEnabled();

		expect(screen.getByText(/definition not found/i));
	});

	it('should enable button when form complies with word textfield validation schema', async () => {
		render(getComponent(), { wrapper: ReduxProvider });
		const textField = screen.getByRole('textbox', { name: /word/i });
		const submitButton = screen.getByRole('button', { name: /submit/i });

		expect(submitButton).toBeEnabled();

		await userEvent.type(textField, 'hi');

		expect(submitButton).toBeEnabled();

		await userEvent.clear(textField);

		const wordUnderLimit = Array.from(Array(30)).reduce(
			(prev) => `${prev}a`,
			''
		);

		await userEvent.type(textField, wordUnderLimit);

		expect(submitButton).toBeEnabled();
	});

	it('should disable button when form has any errors', async () => {
		render(getComponent(), { wrapper: ReduxProvider });

		const textField = screen.getByRole('textbox', { name: /word/i });
		const submitButton = screen.getByRole('button', { name: /submit/i });

		// * Type then clear, otherwise it will be disabled
		await userEvent.type(textField, 'h');
		await userEvent.clear(textField);

		expect(submitButton).toBeDisabled();

		const wordLimitExceeded = Array.from(Array(31)).reduce(
			(prev) => `${prev}a`,
			''
		);

		await userEvent.type(textField, wordLimitExceeded);
		expect(submitButton).toBeDisabled();

		await userEvent.clear(textField);

		await userEvent.type(textField, '123');
		expect(submitButton).toBeDisabled();

		await userEvent.clear(textField);

		await userEvent.type(textField, '.+*7');
		expect(submitButton).toBeDisabled();
	});

	it('should search word meaning', async () => {
		render(getComponent(), { wrapper: ReduxProvider });

		await userEvent.type(
			screen.getByRole('textbox', { name: /word/i }),
			'hello'
		);

		const submitButton = screen.getByRole('button', { name: /submit/i });
		expect(submitButton).toBeEnabled();
		await userEvent.click(submitButton);

		expect(
			await screen.findByText(
				/used as a greeting or to begin a phone conversation/i
			)
		).toBeInTheDocument();
	});

	it('should set display fallback for search word meaning when API Internal Server error', async () => {
		server.use(faultyDictionaryHandlers.internalServerError);

		render(getComponent(), { wrapper: ReduxProvider });

		await userEvent.type(
			screen.getByRole('textbox', { name: /word/i }),
			'hello'
		);

		await userEvent.click(screen.getByRole('button', { name: /submit/i }));

		expect(screen.getByText(/definition not found/i));
	});

	it('should set display fallback when word not found', async () => {
		server.use(faultyDictionaryHandlers.notFound);

		render(getComponent(), { wrapper: ReduxProvider });

		await userEvent.type(
			screen.getByRole('textbox', { name: /word/i }),
			'hello'
		);

		await userEvent.click(screen.getByRole('button', { name: /submit/i }));

		expect(screen.getByText(/definition not found/i));
	});
});
