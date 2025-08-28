/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { RestaurantRepository } from './restaurant.repository';
import { Prisma, Restaurant } from '@prisma/client';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class RestaurantService {
  constructor(
    private restaurantRepository: RestaurantRepository,
    private userService: UserService
  ) { }

  async create(data: CreateRestaurantDto): Promise<Restaurant> {
    const { ownerId } = data;
    const owner = await this.userService.findUserById(ownerId);
    if (!owner) throw new BadRequestException('Invalid Data');
    return await this.restaurantRepository.createDB(data);
  }
  
  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.RestaurantWhereUniqueInput;
    where?: Prisma.RestaurantWhereInput;
    orderBy?: Prisma.RestaurantOrderByWithRelationInput;
  }): Promise<Restaurant[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return await this.restaurantRepository.findAllDB({
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
