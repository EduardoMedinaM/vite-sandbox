import { expect, afterEach, beforeAll, afterAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';

import { server } from './src/mocks/server';

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

// Establish API mocking before all tests
beforeAll(() => server.listen());

afterEach(() => {
	// runs a cleanup after each test case (e.g. clearing jsdom)
	cleanup();
	// reset any request handlers that we may add during the tests,
	// so they don't affect other tests
	server.resetHandlers();
});

// clean up after the tests are finished
afterAll(() => server.close());
