import CustomError from "../utils/CustomError.js";
import { formatteWordList } from "../utils/formatteWordList.js";
import { joiErrorType } from "../utils/joiErrorType.js";

const validation = {
  // We use the schema established with the Joi module to validate the word list.

  async list(listSchema, wordList, req, res) {
      const { error } = listSchema.validate(wordList);
      if (error) {
        const errorMessage = joiErrorType(wordList, error);
        throw new CustomError(errorMessage.message ? errorMessage.message : "Une erreur de format est apparu lors de la vérification de la liste de mots avec la librairie 'Joi'", 400);
      }
      // Word list formatting
      try {
        return (wordList = await formatteWordList(wordList, false));
      } catch (err) {
        throw new CustomError(err.message? err.message : "Error processing formatting word list", err.errorCode ? err.errorCode : 500);
      }
  },
  word(wordStringSchema, word) {
    return function () {
      const { error } = wordStringSchema.validate(word);

      return error ? false : true;
    };
  },

  determinant(word, determinantList) {
    // Is the word a determinant?
    return function () {
      const isDeterminant = determinantList.find((element) => element === word);
      return isDeterminant ? true : false;
    };
  },
};

export { validation };
