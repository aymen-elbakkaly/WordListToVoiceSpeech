function httpErrorType(errorCode) {

  switch (errorCode) {
    case 400:
      return "BAD REQUEST";
    case 404:
      return "404 Not Found";
    case 429:
      return "TOO MANY REQUESTS";
    case 500:
      return "INTERNAL SERVER ERROR";
    default:
      return "UNKNOWN ERROR";
  }
}

export { httpErrorType };
