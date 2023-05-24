import supertest from "supertest";
import app, { close, init } from "../../src/app";
import { cleanDatabase, createObjectId, generateToken } from "../utils/helpers";
import {
  addAddressDb,
  addFavoriteProductDb,
  createPathAndImage,
  createProductDB,
  createUserDB,
  deleteUserDB,
  getUserById,
  invalidSchemaUser,
  newAddress,
  newFakeUserDB,
  newUser,
  updatedUserWithoutPassword,
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
}, 100000);

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
  it("should respond with status 401 if no token is given", async () => {
    const result = await server.get("/users");
    expect(result.statusCode).toBe(401);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = "invalidtoken";
    const result = await server
      .get("/users")
      .set("Authorization", `Bearer ${token}`);
    expect(result.statusCode).toBe(401);
  });

  it("Should find all users and return status code 200", async () => {
    const user = await createUserDB();
    const token = await generateToken(user);
    const result = await server
      .get("/users")
      .set("Authorization", `Bearer ${token}`);
    expect(result.statusCode).toBe(200);
    expect(result.body).toBeInstanceOf(Array);
  });
});

describe("GET /users/:id", () => {
  it("should respond with status 401 if no token is given", async () => {
    const result = await server.get("/users/1");
    expect(result.statusCode).toBe(401);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = "invalidtoken";
    const result = await server
      .get("/users/1")
      .set("Authorization", `Bearer ${token}`);
    expect(result.statusCode).toBe(401);
  });

  it("Should find one user and return status code 200", async () => {
    const user = await createUserDB();
    const token = await generateToken(user);
    const result = await server
      .get(`/users/${user._id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual({
      _id: expect.any(String),
      name: user.name,
      email: user.email,
      image: user.image,
      admin: user.admin,
      addresses: expect.any(Array),
      favorite_products: expect.any(Array),
      created_at: expect.any(String),
    });
  });

  it("Should return status code 404 if not found user", async () => {
    const id = createObjectId();
    const user = await createUserDB();
    const token = await generateToken(user);
    const result = await server
      .get(`/users/${id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(result.statusCode).toBe(404);
  });
});

describe("PUT /users/update", () => {
  it("should respond with status 401 if no token is given", async () => {
    const result = await server.put("/users/update");
    expect(result.statusCode).toBe(401);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = "invalidtoken";
    const result = await server
      .put("/users/update")
      .set("Authorization", `Bearer ${token}`);
    expect(result.statusCode).toBe(401);
  });

  it("Should update one user without password and return status code 204", async () => {
    const user = await createUserDB();
    const token = await generateToken(user);
    const result = await server
      .put(`/users/update`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedUserWithoutPassword());
    expect(result.statusCode).toBe(204);
  });

  it("Should update one user with password and return status code 204", async () => {
    const user = await createUserDB();
    const token = await generateToken(user);
    const result = await server
      .put(`/users/update`)
      .set("Authorization", `Bearer ${token}`)
      .send(newUser());
    expect(result.statusCode).toBe(204);
  });

  it("Should return status code 404 if not found user", async () => {
    const user = await createUserDB();
    const token = await generateToken(user);
    await deleteUserDB(user);
    const result = await server
      .put(`/users/update`)
      .set("Authorization", `Bearer ${token}`);
    expect(result.statusCode).toBe(404);
  });
});

describe("DELETE /users/delete", () => {
  it("should respond with status 401 if no token is given", async () => {
    const result = await server.delete("/users/delete");
    expect(result.statusCode).toBe(401);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = "invalidtoken";
    const result = await server
      .delete("/users/delete")
      .set("Authorization", `Bearer ${token}`);
    expect(result.statusCode).toBe(401);
  });

  it("Should delete one user and return status code 204", async () => {
    const user = await createUserDB();
    const token = await generateToken(user);
    const result = await server
      .delete(`/users/delete`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedUserWithoutPassword());
    expect(result.statusCode).toBe(204);
  });

  it("Should return status code 404 if not found user", async () => {
    const user = await createUserDB();
    const token = await generateToken(user);
    await deleteUserDB(user);
    const result = await server
      .delete(`/users/delete`)
      .set("Authorization", `Bearer ${token}`);
    expect(result.statusCode).toBe(404);
  });
});

describe("POST /users/add-address", () => {
  it("should respond with status 401 if no token is given", async () => {
    const result = await server.post("/users/add-address");
    expect(result.statusCode).toBe(401);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = "invalidtoken";
    const result = await server
      .post("/users/add-address")
      .set("Authorization", `Bearer ${token}`);
    expect(result.statusCode).toBe(401);
  });

  it("Should add address and return status code 201", async () => {
    const user = await createUserDB();
    const token = await generateToken(user);
    const address = newAddress();
    const result = await server
      .post(`/users/add-address`)
      .set("Authorization", `Bearer ${token}`)
      .send(address);
    expect(result.statusCode).toBe(201);
  });

  it("Should return status code 404 if not found user", async () => {
    const user = await createUserDB();
    const token = await generateToken(user);
    await deleteUserDB(user);
    const result = await server
      .post(`/users/add-address`)
      .set("Authorization", `Bearer ${token}`);
    expect(result.statusCode).toBe(404);
  });
});

describe("DELETE /users/remove-address/:id", () => {
  it("should respond with status 401 if no token is given", async () => {
    const result = await server.delete("/users/remove-address/1");
    expect(result.statusCode).toBe(401);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = "invalidtoken";
    const result = await server
      .delete("/users/remove-address/1")
      .set("Authorization", `Bearer ${token}`);
    expect(result.statusCode).toBe(401);
  });

  it("Should remove address and return status code 204", async () => {
    const user = await createUserDB();
    const token = await generateToken(user);
    await addAddressDb(user);
    const userWithAddress = await getUserById(user);
    const addressId = userWithAddress?.addresses[0]._id;
    const result = await server
      .delete(`/users/remove-address/${addressId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(result.statusCode).toBe(204);
  });

  it("Should return status code 404 if not found user", async () => {
    const user = await createUserDB();
    const token = await generateToken(user);
    await addAddressDb(user);
    const userWithAddress = await getUserById(user);
    const addressId = userWithAddress?.addresses[0]._id;
    await deleteUserDB(user);

    const result = await server
      .delete(`/users/remove-address/${addressId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(result.statusCode).toBe(404);
    expect(result.body.message).toBe("User not found!");
  });

  it("Should return status code 404 if not found address", async () => {
    const user = await createUserDB();
    const token = await generateToken(user);

    const result = await server
      .delete(`/users/remove-address/${createObjectId()}`)
      .set("Authorization", `Bearer ${token}`);
    expect(result.statusCode).toBe(404);
    expect(result.body.message).toBe("Address not found!");
  });
});

describe("POST /users/add-favorite-product/:productId", () => {
  it("should respond with status 401 if no token is given", async () => {
    const result = await server.post("/users/add-favorite-product/1");
    expect(result.statusCode).toBe(401);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = "invalidtoken";
    const result = await server
      .post("/users/add-favorite-product/1")
      .set("Authorization", `Bearer ${token}`);
    expect(result.statusCode).toBe(401);
  });

  it("Should add favorite product and return status code 201", async () => {
    const user = await createUserDB();
    const token = await generateToken(user);
    const productId = await createProductDB();
    const result = await server
      .post(`/users/add-favorite-product/${productId._id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(result.statusCode).toBe(201);
  });

  it("Should return status code 404 if not found user", async () => {
    const user = newFakeUserDB();
    const token = await generateToken(user);
    const productId = createObjectId();
    const result = await server
      .post(`/users/add-favorite-product/${productId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(result.statusCode).toBe(404);
  });
});

describe("DELETE /users/remove-favorite-product/:productId", () => {
  it("should respond with status 401 if no token is given", async () => {
    const result = await server.delete("/users/remove-favorite-product/1");
    expect(result.statusCode).toBe(401);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = "invalidtoken";
    const result = await server
      .delete("/users/remove-favorite-product/1")
      .set("Authorization", `Bearer ${token}`);
    expect(result.statusCode).toBe(401);
  });

  it("Should remove favorite product and return status code 204", async () => {
    const user = await createUserDB();
    const token = await generateToken(user);
    const product = await createProductDB();
    await addFavoriteProductDb(user, product);

    const result = await server
      .delete(`/users/remove-favorite-product/${product._id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(result.statusCode).toBe(204);
  });

  it("Should return status code 404 if not found user", async () => {
    const user = newFakeUserDB();
    const token = await generateToken(user);
    const product = await createProductDB();

    const result = await server
      .delete(`/users/remove-favorite-product/${product._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(result.statusCode).toBe(404);
    expect(result.body.message).toBe("User not found!");
  });

  it("Should return status code 404 if not found favorite product", async () => {
    const user = await createUserDB();
    const token = await generateToken(user);

    const result = await server
      .delete(`/users/remove-favorite-product/${createObjectId()}`)
      .set("Authorization", `Bearer ${token}`);
    expect(result.statusCode).toBe(404);
    expect(result.body.message).toBe("Product not found!");
  });
});

describe("GET /users/avatar/:id", () => {
  it("should respond with status 401 if no token is given", async () => {
    const result = await server.get("/users/avatar/1");
    expect(result.statusCode).toBe(401);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = "invalidtoken";
    const result = await server
      .get("/users/avatar/1")
      .set("Authorization", `Bearer ${token}`);
    expect(result.statusCode).toBe(401);
  });

  it("Should find avatar by user and return status code 200", async () => {
    const user = await createUserDB();
    const token = await generateToken(user);

    const result = await server
      .get(`/users/avatar/${user._id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(result.statusCode).toBe(200);
  });

  it("Should return status code 404 if not found user", async () => {
    const fakeId = createObjectId();
    const user = await createUserDB();
    const token = await generateToken(user);
    const result = await server
      .get(`/users/avatar/${fakeId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(result.statusCode).toBe(404);
  });
});

describe("PATCH /users/avatar", () => {
  it("should respond with status 401 if no token is given", async () => {
    const result = await server.patch("/users/avatar/");
    expect(result.statusCode).toBe(401);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = "invalidtoken";
    const result = await server
      .patch("/users/avatar/")
      .set("Authorization", `Bearer ${token}`);
    expect(result.statusCode).toBe(401);
  });

  it("Should update user avatar and return status code 204", async () => {
    const user = await createUserDB();
    const token = await generateToken(user);
    const filePath = createPathAndImage();

    const result = await server
      .patch(`/users/avatar`)
      .set("Authorization", `Bearer ${token}`)
      .attach("avatar", filePath);
    expect(result.statusCode).toBe(204);
  });

  it("Should return status code 404 if not found user", async () => {
    const user = newFakeUserDB();
    const token = await generateToken(user);

    const result = await server
      .patch(`/users/avatar`)
      .set("Authorization", `Bearer ${token}`);
    expect(result.statusCode).toBe(404);
  });
});
