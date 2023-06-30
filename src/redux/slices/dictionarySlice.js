import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isLoading: false,
	error: null,
	dictionaryWord: [],
};

export const dictionarySlice = createSlice({
	name: 'dictionary',
	initialState,
	reducers: {
		fetchDictionaryWord: (state) => {
			state.isLoading = true;
		},
		dictionaryWordFetched: (state, { payload }) => {
			state.isLoading = false;
			state.dictionaryWord = payload;
		},
		errorFetchingDictionaryWord: (state, { payload: error }) => {
			state.isLoading = false;
			state.error = error;
			state.dictionaryWord = [];
		},
	},
});

export const {
	fetchDictionaryWord,
	dictionaryWordFetched,
	errorFetchingDictionaryWord,
} = dictionarySlice.actions;

export default dictionarySlice.reducer;
