/* eslint-disable prettier/prettier */
import { Controller, Get, Query } from '@nestjs/common';
import { DriverService } from './driver.service';

@Controller('driver')
export class DriverController {
    constructor(private readonly driverService: DriverService) {}

    @Get()
    async httpFindClosestDriver(@Query('latitude') lat: string, @Query('longitude') lon: string) {
        const restaurant = { latitude: parseFloat(lat), longitude: parseFloat(lon) };
        return await this.driverService.findClosestDriver(restaurant);
    }
}
