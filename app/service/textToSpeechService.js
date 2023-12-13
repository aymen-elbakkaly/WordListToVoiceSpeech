import "dotenv/config";
import * as textToSpeech from "@google-cloud/text-to-speech";
import CustomError from "../utils/CustomError.js";

// This function takes a word list as input, send it to Google Cloud's Text to Speech api,
// and returns the word list with a base64 voice for each word.

// Instantiates a client
const client = new textToSpeech.TextToSpeechClient({
  projectId: process.env.PROJECTID,
  apiEndpoint: `${process.env.LOCATION}-texttospeech.googleapis.com`,
});

const textToSpeechService = {
  async request(wordList) {

    const wordListAndAudioPromises = wordList.map(async (word, index) => {
      const toRequest = {
        input: { text: word.word },
        voice: { languageCode: "fr-FR", name: "fr-FR-Neural2-B" },
        audioConfig: { audioEncoding: "LINEAR16" },
      };
    
      try {
        const [response] = await client.synthesizeSpeech(toRequest);
    
        // Convert the audio content to a base64 string
        const audioContentBase64 = response.audioContent.toString('base64');
    
        return { ...word, audioContentBase64 };
      } catch (err) {
        throw err;
      }
    });
  
    const results = await Promise.allSettled(wordListAndAudioPromises);
  
    const errors = results.filter(result => result.status === 'rejected');
    if (errors.length > 0) {
      throw new CustomError('One or more errors have occurred during speech synthesis.', 500);
    }
  
    const wordListAndAudio = results.map(result => result.value);
  
    // Return words and audios data
    return wordListAndAudio;
  },
};

export { textToSpeechService };
