import { Injectable } from '@nestjs/common';
import { Category, Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CategoryService {
  constructor(private databaseService: DatabaseService) { }
  create(data: Prisma.CategoryCreateInput): Promise<Category> {
    return this.databaseService.category.create({
      data
    });
  }

  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CategoryWhereUniqueInput;
    where?: Prisma.CategoryWhereInput;
    orderBy?: Prisma.CategoryOrderByWithRelationInput;
  }): Promise<Category[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.databaseService.category.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  findOne(id: string): Promise<Category | null> {
    return this.databaseService.category.findUnique({
      where: { id: id },
    });
  }

  async update(id: string, data: Prisma.CategoryUpdateInput) {
    const category = await this.databaseService.category.findUnique({
      where: { id },
    });
    if (!category) {
      return `Category with ID ${id} not found`;
    }
    return this.databaseService.category.update({
      where: { id: id },
      data,
    });
  }

  async remove(id: string) {
    const category = await this.databaseService.category.findUnique({
      where: { id },
    });

    if (!category) {
      return `Category with ID ${id} not found`;
    }

    return this.databaseService.category.delete({
      where: { id },
    });
  }
}
