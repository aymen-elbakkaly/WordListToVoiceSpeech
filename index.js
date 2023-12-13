// ~ *** *** ENVIRONMENT CONFIG *** *** ~ //
// ~ ********************************** ~ //
import "dotenv/config";

// ~ *** *** EXPRESS CONFIG *** *** ~ //
// ~ ****************************** ~ //
import express from "express";

import { dirname, join } from "path";
import { fileURLToPath } from "url";
import helmet from "helmet";

import { router } from "./app/router/index.js";

const app = express();
app.use(helmet());

// If you have your node.js behind a proxy and are using secure: true, you need to set 'trust proxy' in express
app.set("trust proxy", 1); // trust first proxy

const __dirname = dirname(fileURLToPath(import.meta.url));

const PORT = process.env.PORT || 5000;

// ~ *** *** PARSER CONFIG *** *** ~ //
// ~ ***************************** ~ //
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", express.static(join(__dirname, "public")));

// ~ *** *** LAUNCHER CONFIG *** *** ~ //
// ~ ******************************* ~ //
app.use(router);

app.listen(PORT, () => {
    console.log(` \x1b[1;33m⚡⚡ http://localhost:${PORT} ⚡⚡ \x1b[0m`);
});
