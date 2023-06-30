import { useDispatch, useSelector } from 'react-redux';
import { selectDefinition } from '../../redux/selectors/dictionarySelector';
import { fetchDictionaryWord } from '../../redux/slices/dictionarySlice';
import { useFormik } from 'formik';
import validationSchema from './dictionaryFormSchema';

const useDictionary = () => {
	const dispatch = useDispatch();
	const wordDefinition = useSelector(selectDefinition);
	const formik = useFormik({
		initialValues: {
			word: '',
		},
		validationSchema,
		onSubmit: ({ word }) => dispatch(fetchDictionaryWord(word)),
	});

	return {
		wordDefinition,
		formik,
		isSubmitDisabled: Object.keys(formik.errors).length > 0,
	};
};

export default useDictionary;
