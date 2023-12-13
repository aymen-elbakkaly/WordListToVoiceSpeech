import CustomError from "../utils/CustomError.js";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Here we have all the determinant data query functions using functions provided by "Prisma".

const determinantData = {
    async getDeterminant() {

        try {
            const queries = await prisma.determinant_data.findMany();
            return queries.map(query => query.value);
          } catch (err) {
            throw new CustomError("No determinant found", 500);
        };
    }
};


export { determinantData };
