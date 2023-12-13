import { determinantData } from './../../app/service/determinantData';

test('determinantData returns a result containing certain strings', async () => {
    const result = await determinantData.getDeterminant();

    expect(result).toContain('une');
    expect(result).toContain('un');
    expect(result).toContain('le');
});