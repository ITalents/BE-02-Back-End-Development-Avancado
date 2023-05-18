import mongoose from "mongoose";
import supertest from "supertest";
import app from "../../src/app";

const server = supertest(app);

afterAll(() => {
  mongoose.disconnect();
});

describe("POST /users", () => {
  it("Should create user", async () => {
    const result = await server.post("/users").send({
      name: "Thiago Lima",
      email: "thiago@email.com",
      password: "1234",
      image: "teste",
      admin: true,
    });
    expect(result.statusCode).toBe(200);
    //expect(1).toBe(1);
  });
});
