/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { DatabaseModule } from '../../../../libs/database/src/database.module';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
  imports: [DatabaseModule],
  exports: [CategoryService],
})
export class CategoryModule { }
