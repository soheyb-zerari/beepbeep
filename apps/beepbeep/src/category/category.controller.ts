import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from '@prisma/client';


@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post()
  httpCreate(@Body() data: { name: string }) {
    return this.categoryService.create(data);
  }

  @Get()
  httpFindAll(): Promise<Category[]> {
    return this.categoryService.findAll({});
  }

  @Get(':id')
  httpFindOne(@Param('id') id: string): Promise<Category | null> {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  httpUpdate(@Param('id') id: string, @Body() data: { name: string }) {
    return this.categoryService.update(id, data);
  }

  @Delete(':id')
  httpRemove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
