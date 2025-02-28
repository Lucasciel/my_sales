import AppError from "@modules/errors/AppError";
import { UsersRepositories } from "../database/repositories/UsersRepositories";
import { User } from "../database/entities/User";
import { compare, hash } from "bcrypt";

interface IUpdateProfile {
  user_id: number;
  name: string;
  email: string;
  password: string;
  old_password: string;
}

export default class UpdateProfileService {
  async execute( {
    user_id,
    name,
    email,
    password,
    old_password,
  }: IUpdateProfile): Promise<User>  {
    const user = await UsersRepositories.findById(user_id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    if(email) {
      const userUpdateEmail = await UsersRepositories.findByEmail(email);

      if(userUpdateEmail) {
        throw new AppError('Email ja em uso', 409);
      }

      user.email = email;
    }

    if(password && !old_password) {
      throw new AppError('Old password is required', 401);
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError('Old password does not match', 401);
      }

      user.password = await hash(password, 10);
    }

    if (name) {
      user.name = name;
    }

    await UsersRepositories.save(user);

    return user;
  }

}
