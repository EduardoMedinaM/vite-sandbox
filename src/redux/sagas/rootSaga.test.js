import { all } from 'redux-saga/effects';
import { rootSaga } from './rootSaga';
import dictionarySaga from './dictionarySaga';
import { it, describe, expect } from 'vitest';

describe('rootSaga', () => {
	it('should validate all the watched sagas', () => {
		const genObject = rootSaga();
		expect(genObject.next().value).toEqual(all([dictionarySaga()]));
		expect(genObject.next().done).toBeTruthy();
	});
});
