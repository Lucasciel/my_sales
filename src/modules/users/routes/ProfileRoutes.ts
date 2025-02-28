import { Router} from 'express';
import ProfileController from '../controllers/ProfileControllers';
import { UpdateUserSchemas } from '../schemas/UpdateUserSchemas';
import AuthMiddlewere from '@modules/middlewares/authMiddlewere';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(AuthMiddlewere.execute);
profileRouter.get('/', profileController.show);
profileRouter.put('/', UpdateUserSchemas, profileController.update);

export default profileRouter;
