import { render, screen } from '@testing-library/react';
import NavigationBar from './NavigationBar';
import jest from 'jest-mock';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';

describe('Navigation bar', () => {
	const getComponent = (props = {}) => <NavigationBar {...props} />;

	it('should render', () => {
		render(getComponent({ name: 'The incredible react app' }));
		expect(screen.getByText(/the incredible react app/i)).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'menu' })).toBeInTheDocument();
	});

	it('should call onMenuClicked', async () => {
		const onMenuClicked = jest.fn();
		render(getComponent({ name: 'Test', onMenuClicked }));
		expect(screen.getByText(/test/i)).toBeInTheDocument();
		await userEvent.click(screen.getByRole('button', { name: 'menu' }));
		expect(onMenuClicked).toHaveBeenCalledTimes(1);
	});
});
