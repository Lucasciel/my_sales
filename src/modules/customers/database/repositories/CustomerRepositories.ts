import { AppDataSource } from "@shared/typeorm/data-source";
import { Customer } from "../entities/Customer";

export const CustomerRepositories = AppDataSource.getRepository(Customer).exe({
  async findByName(name: string): Promise<Customer | null> {
    const customer = await this.findOneBy({  name  });

    return customer;
  }

  async findById(id: number): Promise<Customer | null> {
    const customer = await this.findOneBy({ id });

    return customer;
  }

  async findByEmail(email: string): Promise<Customer | null> {
    const customer = await this.findOneBy({ email });

    return customer;
  }
})

