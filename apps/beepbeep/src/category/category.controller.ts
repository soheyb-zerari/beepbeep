/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from '@prisma/client';


@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post()
  async httpCreate(@Body() data: { name: string }) {
    return await this.categoryService.create(data);
  }

  @Get()
  async httpFindAll(): Promise<Category[]> {
    return await this.categoryService.findAll({});
  }

  @Get(':id')
  async httpFindOne(@Param('id') id: string): Promise<Category | null> {
    return await this.categoryService.findOne(id);
  }

  @Patch(':id')
  async httpUpdate(@Param('id') id: string, @Body() data: { name: string }) {
    return await this.categoryService.update(id, data);
  }

  @Delete(':id')
  async httpRemove(@Param('id') id: string) {
    return await this.categoryService.remove(id);
  }
}
