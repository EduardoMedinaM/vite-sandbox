import { createSelector } from '@reduxjs/toolkit';

export const selectCounter = (state) => state.counter;

export const selectValue = createSelector(
  selectCounter,
  ({ value }) => value ?? 0
);
