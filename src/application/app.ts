import express from "express";

import { errorMiddleware } from "./middleware/error-middleware";
import { router } from "./route/router";

export const app = express();
app.use(express.json());

app.use(router);
app.use(errorMiddleware);

// app.listen(3000, () => {
//   console.log("app listening on port 3000");
// });
