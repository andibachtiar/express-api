import supertest from "supertest";
import { app } from "../application/app";
import { logger } from "../application/logging";
import { UserTest } from "./test-util";

describe("POST api/register", () => {
  afterEach(async () => {
    await UserTest.delete();
  });

  it("should failed register if validation has error", async () => {
    const response = await supertest(app).post("/api/register").send({
      username: "",
      name: "",
      password: "",
    });

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it("should succeed register if validation succeed", async () => {
    const response = await supertest(app).post("/api/register").send({
      username: "testing",
      name: "testing",
      password: "testing",
    });

    expect(response.status).toBe(200);
    expect(response.body.data.name).toBe("testing");
    expect(response.body.data.username).toBe("testing");
  });
});

describe("POST api/login", () => {
  beforeEach(async () => {
    await UserTest.create();
  });

  afterEach(async () => {
    await UserTest.delete();
  });

  it("should success logged in if validation succeed", async () => {
    const response = await supertest(app).post("/api/login").send({
      username: "testing",
      password: "testing",
    });

    expect(response.status).toBe(200);
    expect(response.body.data.username).toBe("testing");
    expect(response.body.data.name).toBe("testing");
    expect(response.body.data.token).toBeDefined();
  });
});
