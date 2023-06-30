import { Button, TextField, Typography } from '@mui/material';
import useDictionary from './useDictionary';

const Dictionary = () => {
	const { wordDefinition, formik, isSubmitDisabled } = useDictionary();

	return (
		<>
			<form onSubmit={formik.handleSubmit}>
				<TextField
					id="word"
					name="word"
					label="Word"
					variant="outlined"
					type="text"
					value={formik.values.word}
					onChange={formik.handleChange}
					error={formik.touched.word && Boolean(formik.errors.word)}
					helperText={formik.touched.word && formik.errors.word}
				/>
				<Button
					type="submit"
					disableTouchRipple
					variant="contained"
					disabled={isSubmitDisabled}
				>
					Submit
				</Button>
			</form>

			{wordDefinition && <Typography>{wordDefinition}</Typography>}
		</>
	);
};

export default Dictionary;
