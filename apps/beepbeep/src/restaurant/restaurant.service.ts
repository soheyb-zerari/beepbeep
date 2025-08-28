/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { DatabaseService } from '../../../../libs/database/src/database.service';
import { Prisma, Restaurant } from '@prisma/client';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';

@Injectable()
export class RestaurantService {
  constructor(private databaseService: DatabaseService) { }

  create(data: CreateRestaurantDto): Promise<Restaurant> {
    return this.databaseService.restaurant.create({
      data: data as Prisma.RestaurantCreateInput
    });
  }
  
  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.RestaurantWhereUniqueInput;
    where?: Prisma.RestaurantWhereInput;
    orderBy?: Prisma.RestaurantOrderByWithRelationInput;
  }): Promise<Restaurant[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.databaseService.restaurant.findMany({
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
