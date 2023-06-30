import { createSelector } from '@reduxjs/toolkit';

export const selectCounter = ({ counter }) => counter;

export const selectValue = createSelector(
	selectCounter,
	({ value }) => value ?? 0
);
