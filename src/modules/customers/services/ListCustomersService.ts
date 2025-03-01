import { Customer } from "../database/entities/Customer";
import { CustomerRepositories } from "../database/repositories/CustomerRepositories";



export default class ListCustomersService {
  async execute(): Promise<Customer[]> {
    const customers = await CustomerRepositories.find();

    return customers;
  }
}
