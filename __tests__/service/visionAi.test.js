import { visionAi } from './../../app/service/visionAi';
import fs from 'fs';

const image = fs.readFileSync('__tests__/assests/images/textExemple.png');
const imageBase64 = Buffer.from(image).toString('base64');

test.skip('visionAi must return an array containing objects that should contain a description here test', async () => {

    const result = await visionAi.request(imageBase64);

    let {
        textAnnotations: [, ...textAnnotations],
      } = result[0].responses[0];

    expect(textAnnotations).toEqual(expect.arrayContaining([
        expect.objectContaining({
            description: 'test'
        }),
        expect.objectContaining({
            description: 'test'
        })
    ]));
});

test.skip('visionAi', async () => {

    const result = await visionAi.requestFormatted(imageBase64);

    expect(result).toEqual(expect.arrayContaining([
        expect.objectContaining({
            word: 'test',
        })
    ]));
});
