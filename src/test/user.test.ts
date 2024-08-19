import supertest from "supertest";
import { web } from "../application/web";
import { logger } from "../application/logging";

describe("POST api/register", () => {
  it("should failed register if request is not valid", async () => {
    const response = await supertest(web).post("/api/register").send({
      username: "",
      name: "",
      password: "",
    });

    logger.debug(response.body);

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
});
