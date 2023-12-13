import { Router } from "express";
const router = Router();

import { metricCheck } from "../middleware/metricCheck.js";
import { listController } from "../controller/listController.js";

// ROUTES LIST

const packages = ["@google-cloud/text-to-speech"];

router.post(
    "/list",
    (req, res, next) => metricCheck(req, res, next, packages),
    listController
  );

export { router };
