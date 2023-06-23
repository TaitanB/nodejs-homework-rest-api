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

  test("test login controller", async () => {
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

// const mongoose = require("mongoose");
// const request = require("supertest");
// const bcrypt = require("bcryptjs");
// require("dotenv").config();

// const app = require("../../app");
// const User = require("../../models/user");
// const { DB_HOST } = process.env;

// describe("register controller", () => {
//   let server;

//   beforeAll(() => {
//     server = app.listen(3000);
//     mongoose.connect(DB_HOST);
//   });

//   afterAll(() => {
//     server.close();
//     mongoose.disconnect();
//   });

//   test("test register controller", async () => {
//     const name = "Test";
//     const email = "test@mail.com";
//     const password = "test111";
//     const hash = await bcrypt.hash(password, 10);

//     const newUser = {
//       email,
//       password: hash,
//       name,
//       avatarURL: "test",
//     };

//     const user = await User.create(newUser);

//     const loginUser = {
//       email,
//       password,
//     };

//     const response = await request(app)
//       .post("/api/users/login")
//       .send(loginUser);
//     expect(response.statusCode).toBe(200);

//     const { body } = response;
//     expect(body.token).not.toBe(undefined);

//     const { token } = await User.findById(user._id);
//     expect(body.token).toBe(token);
//   });
// });
