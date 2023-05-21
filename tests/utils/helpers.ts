import UserSchema from "@/modules/Users/schemas/UserSchema";

export async function cleanDatabase() {
  await UserSchema.deleteMany({});
}

export async function generateToken() {
  
}
