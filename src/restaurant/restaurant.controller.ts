import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';


@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) { }

  // @Post()
  // httpCreate(@Body() createRestaurantDto: CreateRestaurantDto) {
  //   return this.restaurantService.create(createRestaurantDto);
  // }

  // @Get()
  // httpFindAll() {
  //   return this.restaurantService.findAll({});
  // }

  // @Get(':id')
  // httpFindOne(@Param('id') id: string) {
  //   return this.restaurantService.findOne(+id);
  // }

  // @Patch(':id')
  // httpUpdate(@Param('id') id: string, @Body() updateRestaurantDto: UpdateRestaurantDto) {
  //   return this.restaurantService.update(+id, updateRestaurantDto);
  // }

  // @Delete(':id')
  // httpRemove(@Param('id') id: string) {
  //   return this.restaurantService.remove(+id);
  // }
}
