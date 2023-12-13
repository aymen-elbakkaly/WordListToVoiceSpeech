import CustomError from "../utils/CustomError.js";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Here we have all the metric data query functions using functions provided by "Prisma".

const metricData = {
    async getServices(packages) {

        try {
            const queries = await prisma.google_cloud_services.findMany({
              where: {
                package: {
                  in: packages,
                },
              },
            });
            return queries;
        } catch (err) {
            throw new CustomError("Error getting on services list", 500);
        };
    },
    async getTotalCharacterCount(serviceId) {
        try {

            const queries = await prisma.request_services.findMany({
                where: {
                  service_id: serviceId,
                },
                include: {
                  request_to_google_cloud: true,
                },
              });
            
            let totalCharacterCount = 0;
            queries.forEach((query) => {
                totalCharacterCount += query.request_to_google_cloud.characters;
            });
            return totalCharacterCount;
        } catch (err) {
            throw new CustomError("Error getting total character count", 500);
        };
    },
    async createRequest(data) {
      try {
        const newRequest = await prisma.request_to_google_cloud.create({
          data: {
            ...data
          }
        });
        return newRequest;
      } catch (err) {
        throw new CustomError("Error creating request", 500);
      }
    },
    async createRequestLinkToService(data) {
      try {
        const newRequestLinkToService = await prisma.request_services.create({
          data: {
            ...data
          }
        });
        return newRequestLinkToService;
      } catch (err) {
        throw new CustomError("Error creating request link to the service", 500);
      }
    },
};


export { metricData };
