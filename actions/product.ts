'use server';

import { prisma } from '@/lib/prisma';
import type { AnimalCategory, ProductCategory } from '@/types';

interface GetProductsParams {
  animalCategory?: AnimalCategory;
  productCategory?: ProductCategory;
}

export async function getProducts({ animalCategory, productCategory }: GetProductsParams = {}) {
  try {
    return await prisma.product.findMany({
      where: {
        isActive: true,
        ...(animalCategory !== undefined && { animalCategory }),
        ...(productCategory !== undefined && { productCategory }),
      },
      orderBy: { createdAt: 'desc' },
    });
  } catch {
    return [];
  }
}

export async function getProductById(id: string) {
  try {
    return await prisma.product.findUnique({
      where: { id, isActive: true },
    });
  } catch {
    return null;
  }
}

export async function getNewArrivals(limit = 8) {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  try {
    return await prisma.product.findMany({
      where: {
        isActive: true,
        createdAt: { gte: thirtyDaysAgo },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  } catch {
    return [];
  }
}

export async function getMdPickProducts() {
  try {
    return await prisma.product.findMany({
      where: { isMdPick: true, isActive: true },
      orderBy: { createdAt: 'desc' },
    });
  } catch {
    return [];
  }
}
