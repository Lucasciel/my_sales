
import AppError from '@modules/errors/AppError';
import {User} from '../database/entities/User';
import { UsersRepositories } from '../database/repositories/UsersRepositories';
import { Secret, sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import 'dotenv/config';

//tipagem dos dados que serão recebidos
interface ISessionUser {
  email: string;
  password: string;
}
interface ISessionResponse {
  user: User;
  token: string;
}

export default class SessionUserService {
  async execute({ email, password}: ISessionUser): Promise<ISessionResponse> {
    const user = await UsersRepositories.findByEmail(email);

    if (!user) {
      throw new AppError('Email/Password incorrect', 401);
    }

    //comparando a senha digitada com a senha do banco
    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Email/Password incorrect', 401);
    }


    const token = sign({ }, process.env.APP_SECRET as Secret, {
      subject: String(user.id),
      expiresIn: '1d',
    })

    return {
      user,
      token,
    }
  }
}
