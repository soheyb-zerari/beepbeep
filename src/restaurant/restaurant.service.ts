/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { DatabaseService } from 'src/database/database.service';
import { Prisma, restaurant } from '@prisma/client';

@Injectable()
export class RestaurantService {
  constructor(private prisma: DatabaseService) { }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(createRestaurantDto: CreateRestaurantDto) {
    return 'This action adds a new restaurant';
  }

  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.restaurantWhereUniqueInput;
    where?: Prisma.restaurantWhereInput;
    orderBy?: Prisma.restaurantOrderByWithRelationInput;
  }): Promise<restaurant[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.restaurant.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} restaurant`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
    return `This action updates a #${id} restaurant`;
  }

  remove(id: number) {
    return `This action removes a #${id} restaurant`;
  }
}
