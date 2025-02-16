import AppError from "@modules/errors/AppError";
import { Product } from "../database/entities/Product";
import { ProductsRepositories } from "../database/repositories/ProductsRepositories";

interface ICreateProduct {
  name: string;
  price: number;
  quantity: number;
}

export default class CreateProductService {
  async execute({name,price,quantity}: ICreateProduct): Promise<Product> {
    const ProductExists = await ProductsRepositories.findByName(name);

    if (ProductExists) {
      throw new AppError('Product already exists', 409);
    }

    const product = ProductsRepositories.create({name,price,quantity});

    await ProductsRepositories.save(product);

    return product;
  }
}
