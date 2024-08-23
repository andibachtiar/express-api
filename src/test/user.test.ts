import supertest from "supertest";
import { app } from "../application/app";
import { logger } from "../application/logging";
import { UserTest } from "./test-util";
import bcrypt from "bcrypt";

describe("POST api/register", () => {
  beforeEach(async () => {
    await UserTest.delete();
  });

  afterEach(async () => {
    await UserTest.delete();
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

  it("should failed register if validation has error", async () => {
    const response = await supertest(app).post("/api/register").send({
      username: "",
      name: "",
      password: "",
    });

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
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

  it("should failed logged in if username or password is empty", async () => {
    const response = await supertest(app).post("/api/login").send({
      username: "",
      password: "",
    });
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it("should failed logged in if password wrong", async () => {
    const response = await supertest(app).post("/api/login").send({
      username: "testing",
      password: "wrong_password",
    });
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });
});

describe("GET api/auth", () => {
  beforeEach(async () => {
    await UserTest.create();
  });

  afterEach(async () => {
    await UserTest.delete();
  });

  it("should be able to get current user if token is valid", async () => {
    const token = await UserTest.createAuthToken();

    const response = await supertest(app)
      .get("/api/auth")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.data.name).toBe("testing");
    expect(response.body.data.username).toBe("testing");
  });

  it("should not be able to get current user if token is invalid", async () => {
    const token = "";

    const response = await supertest(app)
      .get("/api/auth")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });
});

describe("PUT api/auth", () => {
  beforeEach(async () => {
    await UserTest.create();
  });

  afterEach(async () => {
    await UserTest.delete();
  });

  it("should be failed if name & password is empty", async () => {
    const token = await UserTest.createAuthToken();

    const response = await supertest(app)
      .put("/api/auth")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "",
        password: "",
      });

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it("should be failed if token is invalid", async () => {
    const token = "";

    const response = await supertest(app)
      .put("/api/auth")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "testing",
        password: "testing",
      });

    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });

  it("should be succeed if token is valid and name is updated", async () => {
    const token = await UserTest.createAuthToken();

    const response = await supertest(app)
      .put("/api/auth")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "testing revisi",
      });

    expect(response.status).toBe(200);
    expect(response.body.data.name).toBe("testing revisi");
  });

  it("should be succeed if token is valid and password is updated", async () => {
    const token = await UserTest.createAuthToken();

    const response = await supertest(app)
      .put("/api/auth")
      .set("Authorization", `Bearer ${token}`)
      .send({
        password: "revisi_pasasword",
      });

    const auth = await UserTest.getUser();

    expect(response.status).toBe(200);
    expect(await bcrypt.compare("revisi_pasasword", auth.password)).toBe(true);
  });
});
