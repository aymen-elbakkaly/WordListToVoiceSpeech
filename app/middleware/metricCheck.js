import { _error } from "../controller/httpStatusController.js";
import { metricData } from "../service/metricData.js";
import CustomError from "../utils/CustomError.js";

async function metricCheck(req, res, next, packages) {

    try {
        // Provides a list of all the services used for this request by their package name.
        req.services = await metricData.getServices(packages);
        if (!req.services.length) {
            throw new CustomError("The services list is empty", 500);
        }

        // Allows you to check whether the maximum quota has been reached for each service.
        for (const service of req.services) {
            if (await metricData.getTotalCharacterCount(service.id) >= service.limit) {
                throw new CustomError(`The maximum number of characters for service ${service.name} has been reached.`, 500);
            }
        }
    } catch (err) {
        return _error(err.errorCode ? err.errorCode : 500, { message: err.message? err.message : 'Error getting the services or total character count for each service' }, res);
    }
    next();
}

export { metricCheck };
