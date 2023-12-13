import { textToSpeechService } from './../../app/service/textToSpeechService';

test.skip('textToSpeechService', async () => {
    const wordList = [{"word": "test"}];
    
    const result = await textToSpeechService.request(wordList);
    result.forEach(item => {
        expect(item).toHaveProperty('word', 'test');
        expect(typeof item.audioContentBase64).toBe('string');
        expect(item.audioContentBase64).toMatch(/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/);
    });
});