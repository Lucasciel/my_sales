import AppError from "@modules/errors/AppError";
import { userTokensRepositories } from "../database/repositories/UserTokensrepositories";
import { UsersRepositories } from "../database/repositories/UsersRepositories";
import { sendEmail } from "@config/email";

interface IForgotPassword {
  email: string;
}

export default class SendForgotPasswordEmailService {
  async execute({ email }: IForgotPassword): Promise<void>  {
    const user = await UsersRepositories.findByEmail(email);

    if (!user) {
      throw new AppError("User does not exists", 404);
    }

    const Token = await userTokensRepositories.generate(user.id);

    sendEmail({
      to: email,
      subject: 'Password recovery',
      body: `<p>Recovery password token: ${Token}</p>`
    })
  }

}
