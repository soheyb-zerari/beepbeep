/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class DriverService {
    constructor(private readonly databaseService: DatabaseService) {}

    async findClosestDriver(restaurant: { latitude: number; longitude: number }) {
        const drivers = await this.findAvailableDrivers();
        if (!drivers.length) {
            throw new Error('No available drivers found');
        }

        return drivers.reduce((closest, driver) => {
            const driverDistance = this.haversineDistance(
                restaurant.latitude,
                restaurant.longitude,
                driver.address.latitude,
                driver.address.longitude,
            );
            const closestDistance = this.haversineDistance(
                restaurant.latitude,
                restaurant.longitude,
                closest.address.latitude,
                closest.address.longitude,
            );
            return driverDistance < closestDistance ? driver : closest;
        });
    }

    private haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const toRadians = (deg: number) => (deg * Math.PI) / 180;
        const EarthRadius = 6371; // Earth's radius in km
        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return EarthRadius * c; // Distance in km
    }

    async findAvailableDrivers() {
        return this.databaseService.user.findMany({
            where: { isAvailable: true, role: Role.DRIVER },
            select: { id: true, 
                address: {
                    select: {
                        latitude: true,
                        longitude: true,
                    }
                } 
            },
        });
    }

}
