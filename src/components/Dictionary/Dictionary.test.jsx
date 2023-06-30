import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Dictionary from './';
import userEvent from '@testing-library/user-event';
import { ReduxProvider } from '../../utils/testWrappers';

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
		expect(submitButton).not.toBeDisabled();

		expect(screen.getByText(/definition not found/i));
	});

	it('should disable button when form has errors', async () => {
		render(getComponent(), { wrapper: ReduxProvider });

		const textField = screen.getByRole('textbox', { name: /word/i });
		const submitButton = screen.getByRole('button', { name: /submit/i });

		await userEvent.type(textField, 'h');
		await userEvent.clear(textField);

		expect(submitButton).toBeDisabled();

		const wordLimitExceeded = Array.from(Array(31)).reduce(
			(prev) => `${prev}a`,
			''
		);
		await userEvent.type(textField, wordLimitExceeded);

		expect(submitButton).toBeDisabled();
	});

	it('should search word meaning', async () => {
		render(getComponent(), { wrapper: ReduxProvider });

		await userEvent.type(
			screen.getByRole('textbox', { name: /word/i }),
			'hello'
		);

		const submitButton = screen.getByRole('button', { name: /submit/i });
		expect(submitButton).not.toBeDisabled();
		userEvent.click(submitButton);

		expect(
			await screen.findByText(
				/used as a greeting or to begin a phone conversation/i
			)
		).toBeInTheDocument();
	});
});
