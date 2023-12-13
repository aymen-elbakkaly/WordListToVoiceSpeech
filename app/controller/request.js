import { metricData } from "../service/metricData.js";
import CustomError from "../utils/CustomError.js";

// These functions are there to avoid code repetition

const request = {
    async createRequest (wordList, starting_at) {
        
        let wordListCharacterCount = 0;
        if (wordList.some(Boolean)) {
            wordList.forEach((elements) => {
              wordListCharacterCount += elements.word.length;
            });
        }
      
        const dataFoRequest = {
          characters: wordListCharacterCount,
          starting_at: starting_at,
          ending_at: new Date(),
        };
        try {
          return await metricData.createRequest(dataFoRequest);
        } catch (err) {
          throw new CustomError(err.message? err.message : "Error processing metric data, creating request function", err.errorCode ? err.errorCode : 500);
        }
    },
    async requestLinkToService (req, res, newRequest, packageName) {
        const services = packageName 
            ? [req.services.find((service) => service.package === packageName)]
            : req.services;

        for (const service of services) {
            const dataFoRequestLinkToService = {
              request_id: newRequest.id,
              service_id: service.id,
            };
            try {
              await metricData.createRequestLinkToService(dataFoRequestLinkToService);
            } catch (err) {
              throw new CustomError(err.message? err.message : "Error processing metric data creating a link to service request function", err.errorCode ? err.errorCode : 500);
            }
        }
    },
    async fullRequestFunction (req, res, wordList, starting_at, packageName) {
      try {
        const newRequest = await this.createRequest(wordList, starting_at)
        await this.requestLinkToService(req, res, newRequest, packageName);
      } catch (err) {
          throw new CustomError(err.message? err.message : 'Error processing requests functions', err.errorCode? err.errorCode : 500);
      }
  },
}

export { request };