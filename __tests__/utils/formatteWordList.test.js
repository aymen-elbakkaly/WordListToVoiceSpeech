import { formatteWordList } from './../../app/utils/formatteWordList';

test("formatteWordList here is not in form with argurment ggleResp", async () => {
    const wordList = [{"word": "test"}, {"word": "test"}, {"word": "test"}];
    
    const result = await formatteWordList(wordList);
    expect(result).toStrictEqual(wordList);
});

test("formatteWordList here is in form with argurment ggleResp", async () => {
    const textAnnotations = [{  description: 'le' }, {  description: 'test' }, {  description: '*' }, {  description: 'un' }, {  description: 'test' }, {  description: 'оо' }, {  description: '&' }];
    const wordList = [{  word: 'le test' }, {  word: 'un test' }]

    const result = await formatteWordList(textAnnotations, true);
    expect(result).toStrictEqual(wordList);
});