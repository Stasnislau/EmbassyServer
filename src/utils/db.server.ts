import { PrismaClient } from "@prisma/client";

let embassyDB = new PrismaClient();

declare global {
  var prisma: PrismaClient | undefined;
}

if (!global.prisma) global.prisma = new PrismaClient();

embassyDB = global.prisma;

export { embassyDB };
