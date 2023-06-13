// To make the tests work make sure to add .jsx and not js

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import Counter from '.';
import { ReduxProvider } from '../../utils/testWrappers';

const getComponent = (props = {}) => <Counter {...props} />;

describe('Counter', () => {
	it('Should render correctly', () => {
		render(getComponent(), { wrapper: ReduxProvider });
		expect(screen.getByText(/count: 0/i));
		expect(screen.getByRole('button', { name: 'Increment' }));
		expect(screen.getByRole('button', { name: 'Decrement' }));
	});

	it('Should increase by 1', async () => {
		render(getComponent(), { wrapper: ReduxProvider });

		userEvent.click(screen.getByRole('button', { name: 'Increment' }));

		// when updating state by using Redux you need to consider it as async op
		expect(await screen.findByText(/count: 1/i));
	});

	it('Should decrease by 1', async () => {
		render(getComponent(), { wrapper: ReduxProvider });

		// Remember it's a global state so due to the previous test
		// the state will be increased by 1
		userEvent.click(screen.getByRole('button', { name: 'Decrement' }));
		userEvent.click(screen.getByRole('button', { name: 'Decrement' }));

		// you can use this line to debug the screen after an async op
		//await waitForElementToBeRemoved(() => screen.queryByText(/count: 0/i));
		//screen.debug();

		expect(await screen.findByText(/count: -1/i));
	});
});
