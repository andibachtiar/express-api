import express from "express";
import { UserController } from "../controller/user-controller";
import { guestMiddleware, authMiddleware } from "../middleware/auth-middleware";
import { ContactController } from "../controller/contact-controller";

export const router = express.Router();

// route for user not Logged In
router.post("/api/register", guestMiddleware, UserController.register);
router.post("/api/login", guestMiddleware, UserController.login);

// route for user Logged In
router.get("/api/auth", authMiddleware, UserController.get);
router.put("/api/auth", authMiddleware, UserController.update);

router.get("/api/contact", authMiddleware, ContactController.index);
router.post("/api/contact", authMiddleware, ContactController.create);
router.put("/api/contact/:id", authMiddleware, ContactController.update);
router.delete("/api/contact/:id", authMiddleware, ContactController.delete);
