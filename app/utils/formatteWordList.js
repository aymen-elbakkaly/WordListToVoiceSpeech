import CustomError from "./CustomError.js";
import { validation } from "./../service/validation.js";
import { determinantData } from "./../service/determinantData.js";
import { wordStringSchema } from "./../schema/wordString.js";

async function formatteWordList(wordList, ggleResp) {
  let determinantList;
  try {
    determinantList = await determinantData.getDeterminant();
  } catch (err) {
    throw new CustomError(err.message? err.message : "Error getting determinant", err.errorCode? err.errorCode : 500);
  }

  // Function to check whether a word is valid
  const isValidWord = (word) => validation.word(wordStringSchema, word).apply();
  // Function to check whether a word is a determinant
  const isValidDeterminant = (word) => validation.determinant(word, determinantList).apply();

  wordList = wordList.map((option) => ({
    word: ggleResp
      ? option.description.toLowerCase()
      : option.word.toLowerCase(),
  }));

  let formattedList = ggleResp
    ? wordList
        .reduce((acc, { word }, index) => {
          if (isValidWord(word) || word === "-") {
            if (word === "-" && index > 0) {
              // If the word is "-", join the previous and next words.
              acc[acc.length - 1].word += word + wordList[index + 1].word;
              wordList.splice(index, 1); // Delete wordList[index + 1].word
            } else if (
              isValidDeterminant(word) &&
              index < wordList.length - 1 &&
              isValidWord(wordList[index + 1].word)
            ) {
              // If the word is a determinant, merge it with the next one by adding a space between them.
              const mergedWord = word + " " + wordList[index + 1].word;
              acc.push({ word: mergedWord });
              wordList.splice(index, 1); // Delete the determinant and wordList[index + 1].word
            } else {
              acc.push({ word });
            }
          }
          return acc;
        }, [])
        .filter(({ word }) => isValidWord(word))
    : wordList.filter(({ word }) => isValidWord(word));

  return formattedList;
}

export { formatteWordList };
