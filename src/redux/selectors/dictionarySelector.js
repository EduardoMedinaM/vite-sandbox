import { createSelector } from '@reduxjs/toolkit';

export const selectDictionary = (state) => state?.dictionary ?? {};

export const selectDefinition = createSelector(
	selectDictionary,
	({ dictionaryWord = [] }) =>
		dictionaryWord?.[0]?.meanings?.[0]?.definitions?.[0]?.definition ??
		'Definition not found.'
);
