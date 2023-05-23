import { User } from "@/modules/Users/entities/User";
import UserSchema from "@/modules/Users/schemas/UserSchema";
import { createObjectId } from "../utils/helpers";
import ProductSchema from "@/modules/Products/schemas/ProductSchema";
import { Product } from "@/modules/Products/entities/Product";
import faker from "faker";
import { dirname, join } from "path";
import fs from "fs";

export function createPathAndImage() {
  const __dirname = dirname(new URL(import.meta.url).pathname);
  const folderPath = join(__dirname, "images");
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }
  const imageName = "testImage.jpg"
  const imagePath = join(folderPath, imageName);
  const imageContent = "";
  fs.writeFileSync(imagePath, imageContent);

  return imagePath;
}

export function newUser() {
  const user = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    image: createPathAndImage(),
    admin: true,
  };

  return user;
}

export function newFakeUserDB() {
  const user: User = {
    _id: createObjectId(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    image: createPathAndImage(),
    admin: true,
    addresses: [],
    favorite_products: [],
    created_at: new Date(),
  };

  return user;
}

export function invalidSchemaUser() {
  return {
    names: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    image: createPathAndImage(),
    admin: true,
  };
}

export async function createUserDB() {
  const user = await UserSchema.create({
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    image: createPathAndImage(),
    admin: true,
  });

  return user;
}

export async function deleteUserDB(user: User) {
  await UserSchema.deleteOne({ _id: user._id });
}

export function updatedUserWithoutPassword() {
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    image: createPathAndImage(),
    admin: true,
  };
}

export function newAddress() {
  return {
    street: faker.address.streetName(),
    number: faker.datatype.number({ min: 1, max: 999 }).toString(),
    complement: faker.random.alphaNumeric(3),
    zipcode: faker.address.zipCode(),
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

export async function createProductDB() {
  const product = await ProductSchema.create({
    name: faker.commerce.productName(),
    description: faker.lorem.sentence(),
    unit_price: faker.datatype.number({ min: 100, max: 10000 }),
    image: createPathAndImage(),
    bar_code: faker.datatype.number({ min: 100, max: 9999 }),
  });

  return product;
}

export async function addFavoriteProductDb(user: User, product: Product) {
  await UserSchema.updateOne(
    {
      _id: user._id,
    },
    {
      $push: {
        favorite_products: {
          _id: product._id,
        },
      },
    }
  );
}
