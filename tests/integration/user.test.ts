import supertest from "supertest";
import app, { close, init } from "../../src/app";
import { cleanDatabase } from "../utils/helpers";
import {
  createUserDB,
  invalidSchemaUser,
  newUser,
} from "../factories/users.factories";

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
  it("Should create user and return status code 201", async () => {
    const user = newUser();
    const result = await server.post("/users").send(user);
    expect(result.statusCode).toBe(201);
  });

  it("Should return status code 409 if user email exists", async () => {
    const user = createUserDB();
    const result = await server.post("/users").send(user);
    expect(result.statusCode).toBe(409);
  });

  it("Should return status code 409 if user schema incorrect", async () => {
    const user = invalidSchemaUser();
    const result = await server.post("/users").send(user);
    expect(result.statusCode).toBe(409);
  });
});

describe("GET /users", () => {
  /* it("Should return status code 401 if token is invalid", async () => {
    const result = await server.get("/users");
    expect(result.statusCode).toBe(401);
  }); */

 /*  it("Should find all users and return status code 200", async () => {
    const result = await server.get("/users");
    expect(result.statusCode).toBe(201);
  });

  it("Should return status code 409 if user email exists", async () => {
    
  });

  it("Should return status code 409 if user schema incorrect", async () => {
   
  }); */
});
