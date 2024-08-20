import express from "express";

import { errorMiddleware } from "./middleware/error-middleware";
import { router as authRouter } from "./route/guest-router";
import { router as guestRouter } from "./route/auth-router";
import { authMiddleware, guestMiddleware } from "./middleware/auth-middleware";

export const app = express();
app.use(express.json());

app.use("/", guestMiddleware, guestRouter);
app.use("/", authMiddleware, authRouter);

app.use(errorMiddleware);

app.listen(3000, () => {
  console.log("app listening on port 3000");
});
