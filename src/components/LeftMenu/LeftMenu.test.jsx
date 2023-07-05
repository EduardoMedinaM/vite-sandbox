import { describe, it, expect } from 'vitest';
import LeftMenu from './';
import { render, screen } from '@testing-library/react';

describe('LeftMenu', () => {
	const getComponent = (props) => <LeftMenu {...props} />;
	it('should render', () => {
		render(getComponent({ open: true }));
		expect(screen.getByText(/dictionary/i)).toBeInTheDocument();
	});
});
