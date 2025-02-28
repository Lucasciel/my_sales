import {Router} from 'express';
import UsersController from '../controllers/UsersControllers';
import {createUserSchemaValidation} from '../schemas/UserSchemas';
import AuthMiddlewere from '@shared/middlewares/authMiddlewere';

const userRoouter = Router();
const userController = new UsersController();

userRoouter.get('/',AuthMiddlewere.execute, userController.index);

userRoouter.post('/',createUserSchemaValidation, userController.create);


export default userRoouter;
