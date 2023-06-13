import { rest } from 'msw';
import { DICTIONARY_LANGUAGES } from '../../utils/consts';
import { mockDictionaryOkResponse } from './dictionaryResponses';

const getMeaningUrl = `${import.meta.env.VITE_DICTONARY_API_BASE_URL}/entries/${
	DICTIONARY_LANGUAGES.ENGLISH
}/hello`;

const dictionaryHandlers = [
	rest.get(getMeaningUrl, (_, res, ctx) => {
		return res(ctx.status(200), ctx.json(mockDictionaryOkResponse));
	}),
];

export const faultyDictionaryHandlers = {
	internalServerError: rest.get(getMeaningUrl, (_, res, ctx) => {
		return res.once(
			ctx.status(500),
			ctx.json({ message: 'Internal Server Error' })
		);
	}),
	notFound: null,
};

export default dictionaryHandlers;
