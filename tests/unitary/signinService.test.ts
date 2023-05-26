import "reflect-metadata";
import { createUserDB, newUser } from "../factories/users.factories";
import { Auth } from "@/modules/Auth/entities/Auth";
import { generateToken, cleanDatabase } from "../utils/helpers";
import { init, close } from "@/app";
import { jest } from "@jest/globals";
import { authRepository, signinService } from "../factories/auth.factories";
import { NotFoundError } from "@/helpers/errors/apiErrors";

beforeAll(async () => {
  await init();
}, 100_000);

afterAll(async () => {
  await close();
});

beforeEach(async () => {
  await cleanDatabase();
}, 100_000);

describe("Execute function", () => {
  it("Should generate e return token", async () => {
    const user = await createUserDB();
    const token = await generateToken(user);
    const data = new Auth(user.email, user.password);

    const findUserByemailSpy = jest
      .spyOn(authRepository, "findUserByEmail")
      .mockResolvedValue(user);

    const generateTokenSpy = jest
      .spyOn(authRepository, "generateToken")
      .mockReturnValue(token);

    const result = await signinService.execute(data);

    expect(findUserByemailSpy).toHaveBeenCalled();
    expect(generateTokenSpy).toHaveBeenCalled();
    expect(result).toEqual(token);
  });

  it("Should return user not found error", async () => {
    const data = { email: "", password: "" };

    jest
      .spyOn(authRepository, "findUserByEmail")
      .mockImplementationOnce((): any => {
        return undefined;
      });

    await expect(signinService.execute(data)).rejects.toEqual(
      new NotFoundError("User not found")
    );
  });
});
