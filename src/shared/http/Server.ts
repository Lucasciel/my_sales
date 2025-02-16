//importações instaladas
import 'reflect-metadata'
import 'express-async-errors'
import express from "express";
import cors from "cors";

//importações criadas
import routes from "./routes";
import ErrorHandleMiddleware from "@shared/middlewares/ErrorHandleMiddleware";
import { AppDataSource } from '@shared/typeorm/data-source';


AppDataSource.initialize()
.then(async()=> {
  const app = express();

  app.use(cors());
  app.use(express.json())

  app.use(routes);
  app.use(ErrorHandleMiddleware.haddleError);

  console.log("servidor conectado na base de dados!")

  app.listen(3333, ()=> {
    console.log("servidor rodando na porta 3333")
})
})
.catch(error => {
  console.error('Failed to conect to the Database:', error)
});



