import { Product } from "../database/entities/Product";
import { ProductsRepositories } from "../database/repositories/ProductsRepositories";
import AppError from "@shared/errors/AppError";

interface IUpdateProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export class UpdateProductService {
  async execute({ id, name, price, quantity }: IUpdateProduct): Promise<Product> {
    const product = await ProductsRepositories.findById(id);

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    const productExists = await ProductsRepositories.findByName(name);

    if (productExists) {
      throw new AppError('Product already exists', 409);
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await ProductsRepositories.save(product);

    return product;

  } 
}
