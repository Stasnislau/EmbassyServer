import { PrismaClient } from "@prisma/client";

let prisma = new PrismaClient();

declare global {
  var prisma: PrismaClient | undefined;
}

if (!global.prisma) global.prisma = new PrismaClient();

prisma = global.prisma;

export { prisma };
