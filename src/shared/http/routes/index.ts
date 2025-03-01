import {Router} from "express";
import productsRouter from "../../../modules/products/routes/ProductRoutes";
import usersRouter from "../../../modules/users/routes/UserRoutes";
import sessionRouter from "src/modules/users/routes/SessionRoutes";
import avatarRouter from "src/modules/users/routes/AvatarRoutes";
import express, {Router} from 'express';
import uploadConfig from '@config/upload';
import passwordRouter from "src/modules/users/routes/PasswordRoutes";
import profileRouter from "src/modules/users/routes/ProfileRoutes";

const routes = Router();

routes.get('/health', (request, response) => {
  return response.json({message: 'olá dev! Estou vivo'})
})

routes.use('/products', productsRouter)
routes.use('/users', usersRouter)
routes.use('/sessions', sessionRouter)
routes.use('/avatar', avatarRouter)
routes.use('/files', express.static(uploadConfig.directory))
routes.use('/passwords', passwordRouter);
routes.use('/profiles', profileRouter);

export default routes ;
