# WordListToVoiceSpeech API

## Description

WordListToVoiceSpeech is an API designed to process images containing word lists. It takes an image as input and returns a list with each word along with a synthesized voice corresponding to each word. This functionality is achieved through the integration of Vision AI and Text-to-Speech APIs.

**Note:** This API has been designed exclusively for the French language for now.

## Functionality

The API performs the following tasks:
- Accepts an image with a word list as input.
- Utilizes Vision AI to extract individual words from the image.
- Employs Text-to-Speech to generate a synthesized voice for each word.
- Returns a list containing each word paired with its corresponding synthesized voice.

## Technology Stack

The API is built using Node.js and relies on the following libraries:

- [Express](https://expressjs.com/): Web application framework
- [Helmet](https://helmetjs.github.io/): Enhances API security
- [Prisma](https://github.com/prisma/prisma): Database toolkit
- [Body-parser](https://www.npmjs.com/package/body-parser): Parse incoming request bodies
- [Sharp](https://sharp.pixelplumbing.com/): Image processing library
- [Image-type](https://www.npmjs.com/package/image-type): Detects image types
- [Joi](https://www.npmjs.com/package/joi): Object schema validation
- [Vision AI](https://www.npmjs.com/package/@google-cloud/vision): Google Cloud Vision AI API integration
- [IA Text-to-Speech](https://www.npmjs.com/package/@google-cloud/text-to-speech): Google Cloud Text-to-Speech API integration

## Testing

For development purposes, unit tests have been implemented using the following libraries:
- [Babel](https://babeljs.io/): JavaScript compiler
- [Jest](https://jestjs.io/): JavaScript testing framework

## Authentication

In this version of the API, authentication for Google libraries is managed through the [Google CLI](https://cloud.google.com/docs/authentication/gcloud).

## Database

A PostgreSQL database is required for the API to function. Included in the project files is an SQL script (`structure-data.sql`) with the necessary structure for the database. Execute this script to set up the required tables.

## Documentation

API documentation is available through Swagger. To explore and interact with the API, navigate to the Swagger documentation page after starting the server.

## Usage

To use the API, send an image containing a word list as a POST request. The API will respond with a list, where each word is accompanied by a synthesized voice.

## Installation

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up environment variables in a `.env` file.
4. Execute the SQL script (`structure-data.sql`) to set up the required PostgreSQL tables.
5. Run the API using `npm start`.

Feel free to explore and integrate this API into your projects!