import "dotenv/config";
import { serve, setup } from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const cooldown = process.env.COULDOWN / 1000;

const options = {
    definition: {
        // Main information
        openapi: "3.0.0",
        info: {
            version: "1.0.0",
            title: "WordListToVoiceSpeech API",
            description: `The aim of this API is to take an image containing a list of words, and return the list of words in response, with a synthetic voice for each word. To realise the task, the api uses two api's belonging to google, Vision AI and IA Text-to-Speech.<br/>
            Note that this api has been designed exclusively for the French language for now.<br/>
            <br/>
            External link:<br/>
            > [Vision AI](https://cloud.google.com/vision)<br/>
            > [IA Text-to-Speech](https://cloud.google.com/text-to-speech)`,
        },
        // Servers
        servers: [
            {
                url: `http://localhost:${process.env.PORT}/api/v1`
            }
        ],
        // Tags
        tags: [
            {
                name: 'list',
                description: 'List of words to Text-to-Speech',
            },
            {
                name: 'list-img',
                description: 'List of words from an image to Text-to-Speech',
            }
        ],
        // Paths
        paths: {
            "/list": {
                post: {
                    tags: ['list'],
                    summary: `Sending list of words`,
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            word: {
                                                type: 'string'
                                            }
                                        },
                                        required: ['word']
                                    }
                                },
                                example: [
                                    {"word": "test"},
                                    {"word": "test"},
                                    {"word": "test"}
                                ]
                            }
                        }
                    },
                    responses: {
                        200: {
                            description: 'List sent successfully<br/>_200 messages will be in French_',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            success: {
                                                type: 'string'
                                            },
                                            successData: {
                                                type: 'object',
                                                properties: {
                                                    message: {
                                                        type: 'string'
                                                    },
                                                    wordListAndAudio: {
                                                        type: 'array',
                                                        items: {
                                                            type: 'object',
                                                            properties: {
                                                                word: {
                                                                    type: 'string'
                                                                },
                                                                audioContentBase64: {
                                                                    type: 'string'
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    example: {
                                        "success": "SUCCESS REQUEST",
                                        "successData": {
                                            "message": "La liste a bien été obtenue et a pu être traitée",
                                            "wordListAndAudio": [
                                                {
                                                    "word": "test",
                                                    "audioContentBase64": "base64 string"
                                                },
                                                {
                                                    "word": "test",
                                                    "audioContentBase64": "base64 string"
                                                },
                                                {
                                                    "word": "test",
                                                    "audioContentBase64": "base64 string"
                                                }
                                            ]
                                        }
                                    }
                                }
                            }
                        },
                        400: {
                            description: `The request contain an error<br/>_400 messages will be in French_`,
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            error: { type: 'string' },
                                            errorData: {
                                                type: 'object',
                                                properties: {
                                                    message: { type: 'string' }
                                                }
                                            }
                                        }
                                    },
                                    example: {
                                        "error": "BAD REQUEST",
                                        "errorData": {
                                            "message": "Test& contient des caractères non autorisés"
                                        }
                                    }
                                }
                            }
                        },
                    }
                }
            },
            "/list-img": {
                post: {
                    tags: ['list-img'],
                    summary: `Sending a png or jpg image`,
                    requestBody: {
                        required: true,
                        // Swagger UI can't provide exemple for images, so the exemples are just form devlopper's
                        content: {
                            'image/jpeg': {
                                schema: {
                                    type: 'string',
                                    format: 'base64'
                                },
                                example: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExMWFhUX...'
                            },
                            'image/png': {
                                schema: {
                                    type: 'string',
                                    format: 'base64'
                                },
                                example: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=='
                            }
                        }
                    },
                    responses: {
                        200: {
                            description: 'Image sent successfully<br/>_200 messages will be in French_',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            success: {
                                                type: 'string'
                                            },
                                            successData: {
                                                type: 'object',
                                                properties: {
                                                    message: {
                                                        type: 'string'
                                                    },
                                                    wordListAndAudio: {
                                                        type: 'array',
                                                        items: {
                                                            type: 'object',
                                                            properties: {
                                                                word: {
                                                                    type: 'string'
                                                                },
                                                                audioContentBase64: {
                                                                    type: 'string'
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    example: {
                                        "success": "SUCCESS REQUEST",
                                        "successData": {
                                            "message": "L'image a été obtenue et a pu être traitée",
                                            "wordListAndAudio": [
                                                {
                                                    "word": "test",
                                                    "audioContentBase64": "base64 string"
                                                },
                                                {
                                                    "word": "test",
                                                    "audioContentBase64": "base64 string"
                                                },
                                                {
                                                    "word": "test",
                                                    "audioContentBase64": "base64 string"
                                                }
                                            ]
                                        }
                                    }
                                }
                            }
                        },
                        400: {
                            description: `The request contain an error<br/>_400 messages will be in French_`,
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            error: { type: 'string' },
                                            errorData: {
                                                type: 'object',
                                                properties: {
                                                    message: { type: 'string' }
                                                }
                                            }
                                        }
                                    },
                                    example: {
                                        "error": "BAD REQUEST",
                                        "errorData": {
                                            "message": "L'image est corrompue ou mal formée"
                                        }
                                    }
                                }
                            }
                        },
                        429: {
                            description: `Too many requests without ${cooldown} second cooldown<br/>_429 message will be in French_`,
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            error: { type: 'string' },
                                            errorData: {
                                                type: 'object',
                                                properties: {
                                                    message: { type: 'string' }
                                                }
                                            }
                                        }
                                    },
                                    example: {
                                        "error": "TOO MANY REQUESTS",
                                        "errorData": {
                                            "message": "Veuillez attendre X secondes avant de faire une nouvelle requête."
                                        }
                                    }
                                }
                            }
                        },
                    }
                }
            }
        },
    },
    
    apis: ['./../swagger'],
};

const specs = swaggerJsdoc(options);

export { specs, serve, setup };