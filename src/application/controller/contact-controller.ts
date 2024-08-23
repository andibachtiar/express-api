import { NextFunction, Request, Response } from "express";
import { UserService } from "../service/user-service";
import { ContactService } from "../service/contact-service";
import { User } from "@prisma/client";
import { ContactRequest } from "../model/contact-model";
import { ResponseError } from "../error/response-error";

export class ContactController {
  static async index(req: Request, res: Response, next: NextFunction) {
    try {
      const user = UserService.getUser(req) as User;
      const contacts = await ContactService.get(user);

      res.status(200).json({
        data: contacts,
      });
    } catch (e) {
      next(e);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user = UserService.getUser(req) as User;
      const contact = await ContactService.create(
        user,
        req.body as ContactRequest
      );

      res.status(200).json({
        data: contact,
      });
    } catch (e) {
      next(e);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    const contactId = req.params.id;
    const user = UserService.getUser(req) as User;

    try {
      const contact = await ContactService.update(
        contactId,
        user,
        req.body as ContactRequest
      );

      res.status(200).json({
        data: contact,
      });
    } catch (e) {
      next(e);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    const contactId = req.params.id;
    try {
      const user = UserService.getUser(req) as User;
      const contact = await ContactService.delete(contactId, user);

      res.status(200).json({
        data: contact,
      });
    } catch (e) {
      next(e);
    }
  }
}
