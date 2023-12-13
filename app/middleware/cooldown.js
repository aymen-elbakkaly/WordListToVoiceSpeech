import { _error } from "../controller/httpStatusController.js";

let lastRequestTime = 0;
const cooldownTime = process.env.COULDOWN;

function cooldown(req, res, next) {
  // Check if the minimum time has elapsed since the last request
  const currentTime = Date.now();
  if (currentTime - lastRequestTime < cooldownTime) {
    const remainingTime = cooldownTime - (currentTime - lastRequestTime);
    return _error(429, { message: `Veuillez attendre ${
      remainingTime / 1000
    } secondes avant de faire une nouvelle requête.` }, res);
  }

  // Update time of last request
  lastRequestTime = currentTime;

  next();
}

export { cooldown };
