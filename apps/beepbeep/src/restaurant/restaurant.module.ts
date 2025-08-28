/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { DatabaseModule } from '../../../../libs/database/src/database.module';
import { RestaurantRepository } from './restaurant.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [RestaurantController],
  providers: [RestaurantService, RestaurantRepository],
})
export class RestaurantModule { }
