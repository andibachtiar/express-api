import { Prisma, User } from "@prisma/client";
import { prisma } from "../database";
import { ContactRequest, ContactResponse } from "../model/contact-model";
import { ContactValidation } from "../validation/contact-validation";
import { Validation } from "../validation/validation";
import { ObjectId } from "mongodb";
import { ResponseError } from "../error/response-error";

type ContactType = {
  _id: ObjectId;
  contacts: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  }[];
};

export class ContactService {
  static async get(user: User): Promise<ContactResponse[]> {
    const result = await prisma.user.findFirst({
      where: {
        username: user.username,
      },
    });

    return result ? result.contacts : [];
  }

  static async create(user: User, request: ContactRequest) {
    const validated = Validation.validate(ContactValidation.CREATE, request);

    const contact = {
      id: new ObjectId().toString(),
      first_name: validated.first_name,
      last_name: validated.last_name || "",
      email: validated.email || "",
      phone: validated.phone || "",
    };

    await prisma.user.update({
      where: {
        username: user.username,
      },
      data: {
        contacts: {
          push: [contact],
        },
      },
    });

    return contact;
  }

  static async update(contactId: string, user: User, request: ContactRequest) {
    const isExists = await this.isExist(user.id, contactId);
    if (!isExists) {
      throw new ResponseError(404, "Contact not found");
    }

    const validated = Validation.validate(ContactValidation.UPDATE, request);

    const updateData = {
      id: contactId,
      first_name: validated.first_name,
      last_name: validated.last_name || "",
      email: validated.email || "",
      phone: validated.phone || "",
    };

    return await prisma.user.update({
      where: {
        username: user.username,
      },
      data: {
        contacts: {
          updateMany: {
            where: {
              id: contactId,
            },
            data: updateData,
          },
        },
      },
    });

    // const contact = await this.first(user.id, contactId);

    //  contact;

    // return updated;
  }

  static async delete(contactId: string, user: User): Promise<ContactResponse> {
    const isExists = await this.isExist(user.id, contactId);
    if (!isExists) {
      throw new ResponseError(404, "Contact not found");
    }

    const deleted = await prisma.user.update({
      where: {
        username: user.username,
      },
      data: {
        contacts: {
          deleteMany: {
            where: {
              id: contactId,
            },
          },
        },
      },
    });

    return deleted;
  }

  static async isExist(userId: string, contactId: string) {
    const query = await prisma.user.findRaw({
      filter: {
        _id: userId,
        contacts: {
          $elemMatch: {
            id: contactId,
          },
        },
      },
      options: {
        projection: {
          "contacts.$": 1,
        },
      },
    });

    return query.length;
  }

  // static async first(userId: string, contactId: string) {
  //   const query = await prisma.user.findFirst({
  //     filter: {
  //       _id: userId,
  //       contacts: {
  //         $elemMatch: {
  //           id: contactId,
  //         },
  //       },
  //     },
  //     options: {
  //       projection: {
  //         "contacts.$": 1,
  //       },
  //       group: {
  //         contacts: 1,
  //       },
  //     },
  //   });

  //   if (query !== null && query !== undefined) {
  //     return query.find();
  //   }
  // }
}
