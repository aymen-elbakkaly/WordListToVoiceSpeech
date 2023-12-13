import { _200, _error } from "./../controller/httpStatusController.js";
import { request } from "./../controller/request.js";
import { validation } from "../service/validation.js";
import { listSchema } from "../schema/list.js";
import { textToSpeechService } from "../service/textToSpeechService.js";

async function listController(req, res) {
  let wordList = req.body;

  // All checks are performed using the "Joi" library and its schematics,
  // then the list is formatted using a custom function.
  try {
    wordList = await validation.list(listSchema, wordList, req, res);
  } catch (err) {
    return _error(err.errorCode ? err.errorCode : 500, { message: err.message? err.message : "Error processing validation word list" }, res);
  }

  // Normally, no use-case would need to fit into this if condition, it's there to prevent unexpected behavior.
  if (!wordList.some(Boolean)) {
    return _200({message : `La liste a été obtenue mais ne contient aucun mot`}, res);
  }

  const starting_at = new Date();

  let wordListAndAudio;
    try {
      wordListAndAudio = await textToSpeechService.request(wordList);
    } catch (err) {
        try {
          await request.fullRequestFunction(req, res, wordList, starting_at);
        } catch (err) {
            return _error(err.errorCode ? err.errorCode : 500, { message: err.message? err.message : 'Error processing full request function' }, res);
        }

        return _error(err.errorCode ? err.errorCode : 500, { message: err.message? err.message : 'Error processing Text to Speech request function' }, res);
    }

    try {
      await request.fullRequestFunction(req, res, wordList, starting_at);
    } catch (err) {
        return _error(err.errorCode ? err.errorCode : 500, { message: err.message? err.message : 'Error processing full request function' }, res);
    }

  return _200({message : `La liste a bien été obtenue et a pu être traitée`, wordListAndAudio}, res);
}

export { listController };
