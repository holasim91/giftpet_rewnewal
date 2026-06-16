'use server';

import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import type { AnimalCategory, ProductCategory, SortOption, Product } from '@/types';

interface GetProductsParams {
  animalCategory?: AnimalCategory;
  productCategory?: ProductCategory;
  sort?: SortOption;
}

export async function getProducts({ animalCategory, productCategory, sort = 'recommended' }: GetProductsParams = {}) {
  try {
    if (sort === 'price_asc') {
      return await prisma.$queryRaw<Product[]>`
        SELECT * FROM "Product"
        WHERE "isActive" = true
        ${animalCategory ? Prisma.sql`AND "animalCategory" = ${animalCategory}` : Prisma.empty}
        ${productCategory ? Prisma.sql`AND "productCategory" = ${productCategory}` : Prisma.empty}
        ORDER BY COALESCE("discountPrice", price) ASC
      `;
    }
    if (sort === 'price_desc') {
      return await prisma.$queryRaw<Product[]>`
        SELECT * FROM "Product"
        WHERE "isActive" = true
        ${animalCategory ? Prisma.sql`AND "animalCategory" = ${animalCategory}` : Prisma.empty}
        ${productCategory ? Prisma.sql`AND "productCategory" = ${productCategory}` : Prisma.empty}
        ORDER BY COALESCE("discountPrice", price) DESC
      `;
    }

    const where = {
      isActive: true,
      ...(animalCategory !== undefined && { animalCategory }),
      ...(productCategory !== undefined && { productCategory }),
    };

    const orderBy: Prisma.ProductOrderByWithRelationInput[] =
      sort === 'recommended'
        ? [{ isBest: 'desc' }, { isMdPick: 'desc' }, { createdAt: 'desc' }]
        : [{ createdAt: 'desc' }];

    return await prisma.product.findMany({ where, orderBy });
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
      take: 4,
    });
  } catch {
    return [];
  }
}
