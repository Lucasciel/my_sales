import {User} from '../database/entities/User';
import { UsersRepositories } from '../database/repositories/UsersRepositories';

export default class ListUsersService {
  async execute(): Promise<User[]> {
    const users = await UsersRepositories.find();

    return users;
  }
}
