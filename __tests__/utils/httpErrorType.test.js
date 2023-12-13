import { httpErrorType } from './../../app/utils/httpErrorType';

test('httpErrorType returns the correct error message for an error code', () => {
    const code = 400;
    
    const result = httpErrorType(code);
    expect(result).toBe("BAD REQUEST");
});

test('httpErrorType returns the default error message', () => {
    const result = httpErrorType();
    expect(result).toBe("UNKNOWN ERROR");
});