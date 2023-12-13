import "dotenv/config";
import { _error } from "../controller/httpStatusController.js";
import CustomError from "../utils/CustomError.js";
import imageType from 'image-type';
import sharp from 'sharp';

async function isImg(req, res, next) {
  try {

    // Check if content-type are jpeg or png
    const contentType = req.headers["content-type"];
    if (
      !contentType ||
      !(contentType.includes("image/jpeg") || contentType.includes("image/png"))
    ) {
      throw new CustomError(`La requête doit être de content-type image (jpeg/png)`, 400);
    }

    // Check if req.body is defined and if it is a Buffer
    const isBuffer = Buffer.isBuffer(req.body);
    if (!isBuffer || (isBuffer && req.body.length < 1)) {
      throw new CustomError(`Le corps de la requête doit être une image en binaire`, 400);
    }

    // Check the image format
    const type = await imageType(req.body);
    if (!type || (type.mime !== 'image/jpeg' && type.mime !== 'image/png')) {
      throw new CustomError(`Le contenu doit être une image (jpeg/png)`, 400);
    }

    // To avoid a modification of magic bytes / magic numbers
    try {
      await sharp(req.body).metadata();
    } catch (err) {
      throw new CustomError(`L'image est corrompue ou mal formée`, 400);
    }
    
    // Add a check if the image has a size must be good idea for the future

  } catch (err) {
    return _error(err.errorCode ? err.errorCode : 500, { message: err.message? err.message : "Error processing is image function" }, res);
  }
  next();
}

export { isImg };
