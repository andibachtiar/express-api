import express from "express";
import { router as guestRouter } from "./route/guest-router";
import { router as authRouter } from "./route/auth-router";
import { errorMiddleware } from "./middleware/error-middleware";

export const web = express();
web.use(express.json());
web.use(guestRouter);
web.use(authRouter);
web.use(errorMiddleware);

web.listen(3000, () => {
  console.log("app listening on port 3000");
});
