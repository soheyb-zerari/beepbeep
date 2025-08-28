/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { DatabaseService } from '../../../../libs/database/src/database.service';
import { Prisma, Restaurant } from '@prisma/client';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';

@Injectable()
export class RestaurantRepository {
  constructor(private databaseService: DatabaseService) { }

  async createDB(data: CreateRestaurantDto): Promise<Restaurant> {
    const { ownerId, ...rest } = data;
    return await this.databaseService.restaurant.create({
      data: {
        ...rest,
        owner: {
          connect: { id: ownerId }
        }
      }
    });
  }
  
  async findAllDB(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.RestaurantWhereUniqueInput;
    where?: Prisma.RestaurantWhereInput;
    orderBy?: Prisma.RestaurantOrderByWithRelationInput;
  }): Promise<Restaurant[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return await this.databaseService.restaurant.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  findOneDB(id: number) {
    return `This action returns a #${id} restaurant`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateDB(id: number, updateRestaurantDto: UpdateRestaurantDto) {
    return `This action updates a #${id} restaurant`;
  }

  removeDB(id: number) {
    return `This action removes a #${id} restaurant`;
  }

}
