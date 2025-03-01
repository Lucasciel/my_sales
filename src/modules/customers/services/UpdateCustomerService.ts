import { Customer } from "../database/entities/Customer";
import { CustomerRepositories } from "../database/repositories/CustomerRepositories";
import AppError from "@shared/errors/AppError";


interface IUpdateCustomer {
  id: number;
  name: string;
  email: string;
}

export default class UpdateCustomerService {
  public async execute({ id, name, email }: IUpdateCustomer): Promise<Customer> {
    const customer = await CustomerRepositories.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    const customerExists = await CustomerRepositories.findByEmail(email);

    if (customerExists && email !== customer.email) {
      throw new AppError('There is already one customer with this email.',409);
    }

    customer.name = name;
    customer.email = email;

    await CustomerRepositories.save(customer);

    return customer;
  }
}
