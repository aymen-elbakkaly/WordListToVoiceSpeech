import { _error } from "../controller/httpStatusController.js";

// Customized middleware to handle body-parser errors
function bodyParserError(err, req, res, next) {
  if (err) {
    _error(400, { message: `L'image ne doit pas faire plus de ${process.env.IMGMAXSIZE}` }, res);
  } else {
    next();
  }
}

export { bodyParserError };
