import { UsersRepositories } from "../database/repositories/UsersRepositories";
import { userTokensRepositories } from "../database/repositories/UserTokensrepositories";
import AppError from "@modules/errors/AppError";
import { isAfter, addHours} from "date-fns";
import { hash } from "bcrypt";

interface IResetPassword {
    token: string;
    password: string;
}

export default class ResetPasswordService  {
  async execute({token, password}: IResetPassword): Promise<void>  {
    const userToken = await userTokensRepositories.findByToken(token);
    if (!userToken) {
      throw new AppError("User token does not exists", 404);
    }
    const user = await UsersRepositories.findById(userToken.user_id);

    if (!user) {
      throw new AppError("User does not exists", 404);
    }

    const tokenCreatedAt = userToken.created_at;

    const compareDate = addHours(tokenCreatedAt, 2);
    if (isAfter(Date.now(), compareDate)) {
      throw new AppError("Token expired", 401);

    }

    user.password = await hash(password, 10);

    await UsersRepositories.save(user);


  }

}
