/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Category, Prisma } from '@prisma/client';
import { DatabaseService } from '../../../../libs/database/src/database.service';

@Injectable()
export class CategoryRepository {
  constructor(private databaseService: DatabaseService) { }

  async createDB(data: Prisma.CategoryCreateInput): Promise<Category> {
    return await this.databaseService.category.create({
      data
    });
  }

  async findAllDB(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CategoryWhereUniqueInput;
    where?: Prisma.CategoryWhereInput;
    orderBy?: Prisma.CategoryOrderByWithRelationInput;
  }): Promise<Category[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return await this.databaseService.category.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOneDB(id: string): Promise<Category | null> {
    return await this.databaseService.category.findUnique({
      where: { id: id },
    });
  }

  async findUniqueDb(id: string): Promise<Category | null> {
    return await this.databaseService.category.findUnique({
        where: { id },
    })
  }

  async updateDB(id: string, data: Prisma.CategoryUpdateInput): Promise<Category | null> {
    return await this.databaseService.category.update({
      where: { id: id },
      data,
    });
  }

  async removeDB(id: string): Promise<Category | null> {
    return await this.databaseService.category.delete({
      where: { id },
    });
  }
}
