import UserSchema from "@/modules/Users/schemas/UserSchema";

export async function cleanDatabase() {
  await UserSchema.deleteMany({});
}
