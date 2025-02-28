import {Router} from 'express';
import ForgotPasswordController from '../controllers/ForgotPasswordControllers';
import ResetPasswordController from '../controllers/ResetPasswordController';
import { forgotPasswordSchema, ResetPasswordSchema } from '../schemas/PasswordSchemas';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post('/forgot', forgotPasswordSchema, forgotPasswordController.create);

passwordRouter.post('/reset', ResetPasswordSchema, resetPasswordController.create);

export default passwordRouter;
