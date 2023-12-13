import CustomError from './../../app/utils/CustomError';

describe('CustomError', () => {
    it('should correctly set the message and errorCode', () => {
      const errorMessage = 'An error occurred';
      const errorCode = 123;
  
      const error = new CustomError(errorMessage, errorCode);
  
      expect(error.message).toBe(errorMessage);
      expect(error.errorCode).toBe(errorCode);
    });
  });