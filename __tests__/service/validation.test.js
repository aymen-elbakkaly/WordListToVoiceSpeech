import { validation } from './../../app/service/validation';
import { listSchema } from "./../../app/schema/list.js";
import { wordStringSchema } from "./../../app/schema/wordString.js";

test('validation must return the word list', async () => {
    const wordList = [{"word": "test"}];
    
    const result = await validation.list(listSchema, wordList);
    expect(result).toStrictEqual(wordList);
});

test('validation must return a boolean true', async () => {
    const word = "test";
    
    const result = await validation.word(wordStringSchema, word).apply();
    expect(result).toBe(true);
});

test('validation must return a boolean true', async () => {
    const word = "la";
    const determinantList = ["la"];

    const result = await validation.determinant(word, determinantList).apply();
    expect(result).toBe(true);
});