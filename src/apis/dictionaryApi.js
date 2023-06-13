import axios from 'axios';
import { DICTIONARY_LANGUAGES } from '../utils/consts';

export const getWordDefinition = async (word) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_DICTONARY_API_BASE_URL}/entries/${
      DICTIONARY_LANGUAGES.ENGLISH
    }/${word}`
  );

  return data;
};
