import "dotenv/config";

import { Router } from "express";
const router = Router();

import bodyParser from "body-parser";

import { cooldown } from "../middleware/cooldown.js";
import { metricCheck } from "../middleware/metricCheck.js";
import { bodyParserError } from "../middleware/bodyParserError.js";
import { isImg } from "../middleware/isImg.js";
import { listImgController } from "../controller/listImgController.js";

// ROUTES LIST IMG

const packages = ["@google-cloud/vision", "@google-cloud/text-to-speech"];

router.post(
  "/list-img",
  cooldown,
  (req, res, next) => metricCheck(req, res, next, packages),
  bodyParser.raw({
    type: ["image/jpeg", "image/png"],
    limit: process.env.IMGMAXSIZE,
  }),
  bodyParserError,
  isImg,
  listImgController
);

export { router };
