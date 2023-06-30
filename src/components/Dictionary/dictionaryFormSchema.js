import * as Yup from 'yup';

const validationSchema = Yup.object({
	word: Yup.string()
		.trim()
		.min(1)
		.max(30, 'Word cannot be more than 30 characters long')
		.matches(/^[A-Za-z]+$/, 'Word only can accept letters')
		.required('Word is required'),
});

export default validationSchema;
