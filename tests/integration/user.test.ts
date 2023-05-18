import supertest from "supertest";
import app, { close, init } from "../../src/app";
import { cleanDatabase } from "../utils/helpers";

const server = supertest(app);

beforeAll(async () => {
  await init();
});

afterAll(async () => {
  await close();
});

beforeEach(async () => {
  await cleanDatabase();
});

afterEach(async () => {
  await cleanDatabase();
});

describe("POST /users", () => {
  it("Should create user", async () => {
    const result = await server.post("/users").send({
      name: "Thiago Lima",
      email: "thiagovlima@email.com",
      password: "1234",
      image: "Teste",
      admin: true,
    });
    expect(result.statusCode).toBe(201);
    //expect(1).toBe(1);
  });
});
