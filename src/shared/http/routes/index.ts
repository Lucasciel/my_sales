import {Router, Request, Response} from "express"

const routes = Router();

routes.get('/health', (request, response) => {
  return response.json({message: 'olá dev! Estou vivo'})
})

export default routes ;
