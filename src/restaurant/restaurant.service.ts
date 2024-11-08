import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma, Restaurant } from '@prisma/client';

@Injectable()
export class RestaurantService {
  constructor(private databaseService: DatabaseService) { }
  create(data: Prisma.RestaurantCreateInput): Promise<Restaurant> {
    return this.databaseService.restaurant.create({
      data
    });
  }

}
