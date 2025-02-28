import AppError from "@modules/errors/AppError";
import { User } from "../database/entities/User";
import { UsersRepositories } from "../database/repositories/UsersRepositories";
import {hash} from 'bcrypt';

interface ICreateUser {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  async execute({ name, email, password }: ICreateUser): Promise<User>{
    const emailRxists = await UsersRepositories.findByEmail(email);

    if(emailRxists){
      throw new AppError('Email already exists', 409);
    }

    const hashedPassword = await hash(password, 10);

    const user = UsersRepositories.create({
      name,
      email,
      password: hashedPassword
    });

    await UsersRepositories.save(user);

    return user;

  }
}
