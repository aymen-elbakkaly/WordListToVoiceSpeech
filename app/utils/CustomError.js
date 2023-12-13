// Customized error class to handle the error code in addition
class CustomError extends Error {
    constructor(message, errorCode) {
      super(message);
      this.errorCode = errorCode;
    }
  }
  
export default CustomError;