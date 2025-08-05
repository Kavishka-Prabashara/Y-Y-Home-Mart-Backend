import prisma from '../config/db';
import { Product } from '../types/product.types';

export const getAllProducts = async (): Promise<Product[]> => {
    return await prisma.product.findMany();
};

export const createProduct = async (data: Product): Promise<Product> => {
    return await prisma.product.create({ data });
};
