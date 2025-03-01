import AppError from "@shared/errors/AppError";
import { CustomerRepositories } from "../database/repositories/CustomerRepositories";
import { Customer } from "../database/entities/Customer";

interface IShowCustomer {
  id: number;
}

export default class ShowCustomerService {
  public async execute({ id }: IShowCustomer): Promise<Customer> {
    const customer = await CustomerRepositories.findByName(id);

    if (!customer) {
      throw new AppError('Customer not found.', 404);
    }

    return customer;
  }
}
