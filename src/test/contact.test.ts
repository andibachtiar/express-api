import supertest from "supertest";
import { app } from "../application/app";
import { ContactTest, UserTest } from "./test-util";

describe("POST api/contact", () => {
  beforeEach(async () => {
    await UserTest.create();
  });

  afterEach(async () => {
    await UserTest.delete();
  });

  it("should failed to create new contact if user is unauthorization", async () => {
    const token = "";

    const response = await supertest(app)
      .post("/api/contact")
      .set("Authorization", `Bearer ${token}`)
      .send({
        first_name: "",
      });

    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });

  it("should succeed create new contact if body is valid", async () => {
    const token = await UserTest.createAuthToken();

    const response = await supertest(app)
      .post("/api/contact")
      .set("Authorization", `Bearer ${token}`)
      .send({
        first_name: "andi",
        last_name: "bachtiar",
        email: "andibachtiar@example.com",
        phone: "09876554323221",
      });

    expect(response.status).toBe(200);
    expect(response.body.data.first_name).toBe("andi");
    expect(response.body.data.last_name).toBe("bachtiar");
    expect(response.body.data.email).toBe("andibachtiar@example.com");
    expect(response.body.data.phone).toBe("09876554323221");
  });

  it("should failed to create new contact if body is invalid", async () => {
    const token = await UserTest.createAuthToken();

    const response = await supertest(app)
      .post("/api/contact")
      .set("Authorization", `Bearer ${token}`)
      .send({
        first_name: "",
      });

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
});

describe("GET api/contact", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
  });

  afterEach(async () => {
    await UserTest.delete();
  });

  it("should be able to retreive user's contacts if user is authorized", async () => {
    const token = await UserTest.createAuthToken();

    const response = await supertest(app)
      .get("/api/contact")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
  });

  it("should be able to retreive user's contacts if user is unauthorized", async () => {
    const token = "";

    const response = await supertest(app)
      .get("/api/contact")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });

  it("should be able to retreive user's contacts", async () => {
    const token = await UserTest.createAuthToken();

    const response = await supertest(app)
      .get("/api/contact")
      .set("Authorization", `Bearer ${token}`);

    const data = response.body.data[0];

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(data.first_name).toBe("testing");
    expect(data.last_name).toBe("testing");
    expect(data.email).toBe("testing");
    expect(data.phone).toBe("testing");
  });
});

describe("PUT api/contact", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
  });

  afterEach(async () => {
    await UserTest.delete();
  });

  it("should failed to updated contact if user is unauthorization", async () => {
    const token = "";
    const contact = await ContactTest.get();

    const response = await supertest(app)
      .put(`/api/contact/${contact?.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        first_name: "",
      });

    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });

  it("should failed to updated contact if contact id is invalid", async () => {
    const token = await UserTest.createAuthToken();

    const response = await supertest(app)
      .put(`/api/contact/wrong_id`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        first_name: "update",
        last_name: "update",
        email: "update@example.com",
        phone: "update",
      });

    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });

  it("should succeed to updated contact if body is valid", async () => {
    const token = await UserTest.createAuthToken();
    const contact = await ContactTest.get();

    const response = await supertest(app)
      .put(`/api/contact/${contact?.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        first_name: "update",
        last_name: "update",
        email: "update@example.com",
        phone: "update",
      });

    expect(response.status).toBe(200);
    expect(response.body.data.first_name).toBe("update");
    expect(response.body.data.last_name).toBe("update");
    expect(response.body.data.email).toBe("update@example.com");
    expect(response.body.data.phone).toBe("update");
  });

  it("should failed to update if body is invalid", async () => {
    const token = await UserTest.createAuthToken();
    const contact = await ContactTest.get();

    const response = await supertest(app)
      .put(`/api/contact/${contact?.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        first_name: "",
      });

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
});

// describe("DELETE api/contact", () => {
//   beforeEach(async () => {
//     await UserTest.create();
//     await ContactTest.create();
//   });

//   afterEach(async () => {
//     await UserTest.delete();
//   });

//   it("should failed to deleted contact if user is unauthorization", async () => {
//     const token = "";
//     const contact = await ContactTest.get();

//     const response = await supertest(app)
//       .delete(`/api/contact/${contact?.id}`)
//       .set("Authorization", `Bearer ${token}`);

//     expect(response.status).toBe(401);
//     expect(response.body.errors).toBeDefined();
//   });

//   it("should succeed to deleted contact if body is valid", async () => {
//     const token = await UserTest.createAuthToken();
//     const contact = await ContactTest.get();

//     const response = await supertest(app)
//       .delete(`/api/contact/${contact?.id}`)
//       .set("Authorization", `Bearer ${token}`);

//     expect(response.status).toBe(200);
//     expect(response.body.data.first_name).toBe("update");
//     expect(response.body.data.last_name).toBe("update");
//     expect(response.body.data.email).toBe("update@example.com");
//     expect(response.body.data.phone).toBe("update");
//   });

//   it("should failed to deleted if body is invalid", async () => {
//     const token = await UserTest.createAuthToken();
//     const contact = await ContactTest.get();

//     const response = await supertest(app)
//       .delete(`/api/contact/${contact?.id}`)
//       .set("Authorization", `Bearer ${token}`);

//     expect(response.status).toBe(400);
//     expect(response.body.errors).toBeDefined();
//   });
// });
