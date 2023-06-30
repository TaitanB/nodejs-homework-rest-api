const mongoose = require("mongoose");
const request = require("supertest");
require("dotenv").config();

const app = require("../../app");

const { DB_HOST } = process.env;

describe("login controller", () => {
  let server;

  beforeAll(() => {
    server = app.listen(3000);
    mongoose.connect(DB_HOST);
  });

  test("should return Unauthorized error", async () => {
    const testData = {
      email: "test@mail.com",
      password: "test1111",
    };

    const res = await request(app).post("/api/users/login").send(testData);

    expect(res.statusCode).toBe(401);
  });

  test("should return Unauthorized error", async () => {
    const testData = {
      email: "test1@mail.com",
      password: "test111",
    };

    const res = await request(app).post("/api/users/login").send(testData);

    expect(res.statusCode).toBe(401);
  });

  test("should return token and user email and user password", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send({ email: "test@mail.com", password: "test111" });

    const {
      _body: { token, user },
    } = response;

    expect(response.statusCode).toBe(200);

    expect(token).not.toBe(undefined);

    expect(user).toHaveProperty("email");
    expect(typeof user.email).toBe("string");

    expect(user).toHaveProperty("subscription");
    expect(typeof user.subscription).toBe("string");
  });

  afterAll(() => {
    server.close();
    mongoose.disconnect();
  });
});
