/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Category, Prisma } from '@prisma/client';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) { }

  async create(data: Prisma.CategoryCreateInput): Promise<Category> {
    return await this.categoryRepository.createDB(data);
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CategoryWhereUniqueInput;
    where?: Prisma.CategoryWhereInput;
    orderBy?: Prisma.CategoryOrderByWithRelationInput;
  }): Promise<Category[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return await this.categoryRepository.findAllDB({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOne(id: string): Promise<Category | null> {
    return await this.categoryRepository.findOneDB(id);
  }

  async update(id: string, data: Prisma.CategoryUpdateInput): Promise<Category> {
    const categoryDB = await this.categoryRepository.findUniqueDb(id);
    if (!categoryDB) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return await this.categoryRepository.updateDB(id, data);
  }

  async remove(id: string): Promise<Category> {
    const categoryDB = await this.categoryRepository.findUniqueDb(id);
    if (!categoryDB) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return await this.categoryRepository.removeDB(id);
  }
}
