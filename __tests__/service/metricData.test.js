import { metricData } from './../../app/service/metricData';

test('metricData returns a result containing certain objects containing certain strings', async () => {
    const packages = ["@google-cloud/vision", "@google-cloud/text-to-speech"];
    
    const result = await metricData.getServices(packages);
    expect(result).toEqual(expect.arrayContaining([
        expect.objectContaining({
            name: 'VisionAi',
            package: '@google-cloud/vision'
        }),
        expect.objectContaining({
            name: 'Text-To-Speech',
            package: '@google-cloud/text-to-speech'
        })
    ]));
});

test('metricData returns a result which must be a number', async () => {
    const serviceId = 0;
    
    const result = await metricData.getTotalCharacterCount(serviceId);
    expect(typeof result).toBe('number');
});

test('metricData returns a result which must contain the data sent', async () => {
    const date = new Date();
    const data = {
        characters: 0,
        starting_at: date,
        ending_at: date,
      };
    
    const result = await metricData.createRequest(data);
    expect(result).toEqual(expect.objectContaining(data));
});

test.skip('metricData returns a result which must contain the data sent', async () => {
    const data = {
        request_id: 1,
        service_id: 0,
      };
    
    const result = await metricData.createRequestLinkToService(data);
    expect(result).toEqual(expect.objectContaining(data));
});