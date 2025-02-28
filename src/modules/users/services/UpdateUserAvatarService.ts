import { User } from "../database/entities/User";
import { UsersRepositories } from "../database/repositories/UsersRepositories";
import fs from "fs";
import path from "path";
import uploadConfig from "../../../config/upload";

interface IUpdateUserAvatar {
  userId: number;
  avatarFilename: string;
}

export default class UpdateUserAvatarService {
  async execute({ userId, avatarFilename }: IUpdateUserAvatar): Promise<User> {
    const user = await UsersRepositories.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }


    user.avatar = avatarFilename;

    await UsersRepositories.save(user);

    return user;
  }
}
