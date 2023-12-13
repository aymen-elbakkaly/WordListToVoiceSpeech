import "dotenv/config";
import CustomError from "../utils/CustomError.js";
import { ImageAnnotatorClient } from "@google-cloud/vision";
import { formatteWordList } from "../utils/formatteWordList.js";

const projectId = process.env.PROJECTID;
const location = process.env.LOCATION;

// TODO Check exactly why ("use strict"); is for
("use strict");

const parent = `projects/${projectId}/locations/${location}`;

// Instantiates a client
const visionClient = new ImageAnnotatorClient({
  projectId,
  apiEndpoint: `${location}-vision.googleapis.com`,
});

const visionAi = {

  async request(imageBase64) {
      // Construct request
      const toRequest = {
        requests: [
          {
            image: {
              content: imageBase64,
            },
            features: [
              {
                type: "TEXT_DETECTION",
                maxResults: 1,
              },
            ],
          },
        ],
        parent,
      };
  
      try {
        return await visionClient.batchAnnotateImages(toRequest);
      } catch (err) {
        throw new CustomError(`The server has encountered a problem with the connection to the Vision Ai api`, 500);
      }
  },

  async requestFormatted(imageBase64) {
    let response;
    try {
      response = await this.request(imageBase64)
    } catch (err) {
      throw new CustomError(err.message? err.message : "The server encountered a problem when executing the function connecting to the Vision Ai api", err.errorCode ? err.errorCode : 500);
    }

    try {
      let {
        textAnnotations: [, ...textAnnotations],
      } = response[0].responses[0];

      return textAnnotations = await formatteWordList(textAnnotations, true);
    } catch (err) {
      throw new CustomError(err.message? err.message : `Error processing formating word list`, err.errorCode? err.errorCode : 500);
    }
  }
}


export { visionAi };
