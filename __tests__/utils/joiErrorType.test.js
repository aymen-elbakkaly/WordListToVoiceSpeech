import { joiErrorType } from './../../app/utils/joiErrorType';

test('joiErrorType returns correct error message for string.min error', () => {
    const wordList = [{ word: 'test' }];
    const error = {
      details: [{
        path: [0],
        context: { limit: 2 },
        type: 'string.min'
      }]
    };

    const result = joiErrorType(wordList, error);
    expect(result).toStrictEqual({message: "test dois contenir au moins 2 caractère(s)", type: "string.min"});
});

test('joiErrorType returns correct error message for string.max error', () => {
    const wordList = [{ word: 'test' }];
    const error = {
      details: [{
        path: [0],
        context: { limit: 32 },
        type: 'string.max'
      }]
    };

    const result = joiErrorType(wordList, error);
    expect(result).toStrictEqual({message: "test contient plus de 32 caractère(s)", type: "string.max"});
});

test('joiErrorType returns correct error message for string.pattern error', () => {
    const wordList = [{ word: 'test' }];
    const error = {
      details: [{
        path: [0],
        type: 'string.pattern'
      }]
    };

    const result = joiErrorType(wordList, error);
    expect(result).toStrictEqual({message: "test contient des caractères non autorisés", type: "string.pattern"});
});

test('joiErrorType returns correct error message for string.base error', () => {
    const wordList = [{ word: "test" }];
    const error = {
      details: [{
        path: [0],
        type: 'string.base'
      }]
    };

    const result = joiErrorType(wordList, error);
    expect(result).toStrictEqual({message: "test n'est pas au bon format", type: "string.base"});
});

test('joiErrorType returns correct error message for array.min error', () => {
    const wordList = [];
    const error = {
      details: [{
        context: { limit: 1 },
        type: 'array.min'
      }]
    };

    const result = joiErrorType(wordList, error);
    expect(result).toStrictEqual({message: "La liste fournie doit contenir au moins 1 mot(s)", type: "array.min"});
});

test('joiErrorType returns correct error message for array.max error', () => {
    const wordList = [];
    const error = {
      details: [{
        context: { limit: 20 },
        type: 'array.max'
      }]
    };

    const result = joiErrorType(wordList, error);
    expect(result).toStrictEqual({message: "La liste fournie ne doit pas contenir plus de 20 mot(s)", type: "array.max"});
});

test('joiErrorType returns correct error message for array.base error', () => {
    const wordList = [{ word: "test" }];
    const error = {
      details: [{
        type: 'array.base'
      }]
    };

    const result = joiErrorType(wordList, error);
    expect(result).toStrictEqual({message: "Les données envoyées sont au mauvais format", type: "array.base"});
});

test('joiErrorType returns correct error message for object.unknown error', () => {
    const wordList = [{ test: 'test' }];
    const error = {
      details: [{
        path: [0],
        type: 'object.unknown'
      }]
    };

    const result = joiErrorType(wordList, error);
    expect(result).toStrictEqual({message: "La liste fournie contient des données au mauvais format", type: "object.unknown"});
});

// Ajoutez ici d'autres tests pour les types d'erreurs que vous jugez les plus importants