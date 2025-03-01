import AppError from "@shared/errors/AppError";
import { CustomerRepositories } from "../database/repositories/CustomerRepositories";
import { Customer } from "../database/entities/Customer";

interface ICreateCustomer{
  name: string;
  email: string;
}

export default class CreateCustomerService {
  public async execute({ name, email }: ICreateCustomer): Promise<Customer> {
    const emailExists = await CustomerRepositories.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already used.', 409);
    }

    const customer = await CustomerRepositories.create({
      name,
      email,
    });

    await CustomerRepositories.save(customer);

    return customer;
  }
}

