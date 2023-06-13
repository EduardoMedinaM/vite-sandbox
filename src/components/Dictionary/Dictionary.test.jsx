import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Dictionary from './';

describe('Dictionary', () => {
	const getComponent = (props) => <Dictionary {...props} />;

	it('should render', () => {
		render(getComponent());
		expect(screen.getByText(/dictionary/i)).toBeInTheDocument();
	});
});
