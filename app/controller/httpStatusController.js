import { httpErrorType } from "../utils/httpErrorType.js";

// ~ *** *** HTTP_STATUS_CONTROLLER *** *** ~ //

function _200(successData, res) {
  res.status(200).json({ success: "SUCCESS REQUEST", successData });
}

function _error(code, message, res) {
  res.status(code).json({ error: httpErrorType(code), errorData: message });
}

export { _200, _error };
