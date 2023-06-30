import { rest } from 'msw';
import { DICTIONARY_LANGUAGES } from '../../utils/consts';
import { mockDictionaryOkResponse } from './dictionaryResponses';

const wordDefinitionUrl = `${
	import.meta.env.VITE_DICTONARY_API_BASE_URL
}/entries/${DICTIONARY_LANGUAGES.ENGLISH}/hello`;

const dictionaryHandlers = [
	rest.get(wordDefinitionUrl, (_, res, ctx) => {
		return res(ctx.status(200), ctx.json(mockDictionaryOkResponse));
	}),
];

export const faultyDictionaryHandlers = {
	internalServerError: rest.get(wordDefinitionUrl, (_, res, ctx) => {
		return res.once(
			ctx.status(500),
			ctx.json({ message: 'Internal Server Error' })
		);
	}),
	notFound: rest.get(wordDefinitionUrl, (_, res, ctx) => {
		return res.once(
			ctx.status(404),
			ctx.json({
				title: 'No Definitions Found',
				message:
					"Sorry pal, we couldn't find definitions for the word you were looking for.",
				resolution:
					'You can try the search again at later time or head to the web instead.',
			})
		);
	}),
};

export default dictionaryHandlers;
