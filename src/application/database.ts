import { PrismaClient } from "@prisma/client";
import { logger } from "./logging";

export const prisma = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "error",
    },
    // {
    //   emit: "event",
    //   level: "error",
    // },
    // {
    //   emit: "event",
    //   level: "info",
    // },
    // {
    //   emit: "event",
    //   level: "warn",
    // },
  ],
});

prisma.$on("error", (e) => {
  logger.error(e);
});

// prisma.$on("warn", (e) => {
//   logger.error(e);
// });

// prisma.$on("info", (e) => {
//   logger.error(e);
// });

// prisma.$on("query", (e) => {
//   logger.error(e);
// });
