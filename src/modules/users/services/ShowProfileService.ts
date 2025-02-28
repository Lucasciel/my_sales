import {UsersRepositories} from '../database/repositories/UsersRepositories';
import { User } from '../database/entities/User';

interface IShowProfile {
  user_id: number;
}


export default class ShowProfileService {
  async execute({ user_id}: IShowProfile): Promise<User> {
    const user = await UsersRepositories.findById(user_id);

    if (!user) {
      throw new Error('User not found');
    }
  }
}
