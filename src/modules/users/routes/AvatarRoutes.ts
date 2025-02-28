import { Router } from "express";
import multer from "multer";
import uploadConfig from "@config/upload";
import UpdateAvatarController from "../controllers/UpdateAvatarControllers";
import AuthMiddlewere from "@modules/middlewares/authMiddlewere";

const avatarRouter = Router();
const updateAvatarController = new UpdateAvatarController();
const upload = multer(uploadConfig.multer);

avatarRouter.patch('/', AuthMiddlewere.execute,
  upload.single('avatar'),
  updateAvatarController.update,);

  export default avatarRouter;
