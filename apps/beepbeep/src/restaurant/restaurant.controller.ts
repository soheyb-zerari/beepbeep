/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';


@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) { }

  @Post()
  async httpCreate(@Body() createRestaurantDto: CreateRestaurantDto) {
      return await this.restaurantService.create(createRestaurantDto);
  }

  @Get()
  httpFindAll() {
    return this.restaurantService.findAll({});
  }

  @Get(':id')
  httpFindOne(@Param('id') id: string) {
    return this.restaurantService.findOne(+id);
  }

  @Patch(':id')
  httpUpdate(@Param('id') id: string, @Body() updateRestaurantDto: UpdateRestaurantDto) {
    return this.restaurantService.update(+id, updateRestaurantDto);
  }

  @Delete(':id')
  httpRemove(@Param('id') id: string) {
    return this.restaurantService.remove(+id);
  }
}
