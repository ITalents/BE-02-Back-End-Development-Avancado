import UserSchema from "@/modules/Users/schemas/UserSchema";

export function newUser() {
  return {
    name: "Thiago Lima",
    email: "thiago@email.com",
    password: "1234",
    image: "Teste",
    admin: true,
  };
}

export function invalidSchemaUser() {
  return {
    name: 1,
    emails: "thiago@email.com",
    password: "1234",
    image: "Teste",
    admin: true,
  };
}

export async function createUserDB() {
  const user = await UserSchema.create({
    name: 1,
    email: "thiago@email.com",
    password: "1234",
    image: "Teste",
    admin: true,
  });

  return user;
}
