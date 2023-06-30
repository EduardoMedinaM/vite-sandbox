import { createSelector } from '@reduxjs/toolkit';

export const selectDictionary = ({ dictionary }) => dictionary;

export const selectDefinition = createSelector(
	selectDictionary,
	({ dictionaryWord }) => {
		return (
			dictionaryWord?.[0]?.meanings?.[0]?.definitions?.[0]?.definition ??
			'Definition not found.'
		);
	}
);
