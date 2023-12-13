import "dotenv/config";
import { _200, _error } from "./httpStatusController.js";
import { request } from "./../controller/request.js";
import { visionAi } from "../service/visionAi.js";
import { textToSpeechService } from "../service/textToSpeechService.js";

async function listImgController(req, res) {

    // Convert image to base64
    const imageBase64 = req.body.toString("base64");

    const starting_at = new Date();
    let wordList;

    try {
      wordList = await visionAi.requestFormatted(imageBase64);
    } catch (err) {
      return _error(err.errorCode ? err.errorCode : 500, { message: err.message? err.message : `Error processing visionAi request function` }, res);
    }

    if (!wordList.some(Boolean)) {
      try {
            await request.fullRequestFunction(req, res, wordList, starting_at, "@google-cloud/vision");
        } catch (err) {
            return _error(err.errorCode ? err.errorCode : 500, { message: err.message? err.message : 'Error processing full request function' }, res);
        }

      return _200({message : `L'image a été obtenue mais ne contient aucun texte`}, res);
    }

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
    
    return _200({message : `L'image a été obtenue et a pu être traitée`, wordListAndAudio}, res);
}

export { listImgController };
