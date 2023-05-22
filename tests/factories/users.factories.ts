import { User } from "@/modules/Users/entities/User";
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
    name: "Thiago",
    email: "thiago@email.com",
    password: "1234",
    image: "Teste",
    admin: true,
  });

  return user;
}

export async function deleteUserDB(user: User) {
  await UserSchema.deleteOne({ _id: user._id });
}

export function updatedUserWithoutPassword() {
  return {
    name: "Thiago Lima Edit",
    email: "thiago@email.com",
    image: "Teste",
    admin: true,
  };
}

export function updatedUserWithPassword() {
  return {
    name: "Thiago Lima Edit",
    email: "thiago@email.com",
    password: "123456",
    image: "Teste",
    admin: true,
  };
}

export function newAddress() {
  return {
    street: "Rua ABC",
    number: "100",
    complement: "ap 14",
    zipcode: "09876554",
  };
}

export async function addAddressDb(user: User) {
  await UserSchema.updateOne(
    {
      _id: user._id,
    },
    {
      $push: {
        addresses: newAddress(),
      },
    }
  );
}

export async function getUserById(user: User) {
  return await UserSchema.findById(user._id);
}
