import { Router } from "express";
const router = Router();

import { specs, serve, setup } from './../../swagger/swagger.js';

import { _200, _error } from "../controller/httpStatusController.js";

router.use("/api-docs", serve, setup(specs));

router.get("/", (req, res) => {
  _200(`Bienvenu sur l'API WordListToVoiceSpeech`, res);
});

import { router as listRouter } from "./list.js";
router.use("/api/v1", listRouter);

import { router as listImgRouter } from "./listImg.js";
router.use("/api/v1", listImgRouter);

router.use((req, res, next) => {
  _error(404, { message: `L'url '${req.url}' n'est pas enregistrée sur cette API` }, res);
});

export { router };
