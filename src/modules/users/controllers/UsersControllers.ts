import {Request, Response} from 'express';
import ListUsersService from '../services/ListUsersService';
import CreateUserService from '../services/CreateUserService';

export default class UsersController {

  //lista todos os usuários GET
  async index(request: Request, response: Response): Promise<Response> {
    const listUsersService = new ListUsersService();
    const users = await listUsersService.execute();
    return response.json(users);
  }

  //cria um usuario POST
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body; //pega dados do request
    const createUserService = new CreateUserService();
    const user = await createUserService.execute({ name, email, password });
    return response.json(user);
  }
}
