import express, { Request, Response } from "express";
import { UserController } from "../controller/user-controller";
import { guestMiddleware, authMiddleware } from "../middleware/auth-middleware";

export const router = express.Router();

// route for user not Logged In
router.post("/api/register", guestMiddleware, UserController.register);
router.post("/api/login", guestMiddleware, UserController.login);

// route for user Logged In
router.get("/api/auth", authMiddleware, UserController.get);
router.put("/api/auth", authMiddleware, UserController.update);

// router.get("/api/dashboard", (req: Request, res: Response) => {
//   res.status(200).json({
//     data: "oke",
//   });
// });
