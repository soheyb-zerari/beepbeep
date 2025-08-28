/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class CreateRestaurantDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    address: string;
    
    @IsNumber()
    lattitude: number

    @IsNumber()
    longitude: number

    @IsString()
    @MaxLength(13)
    @MinLength(10)
    phone: string;

    @IsString()
    ownerId: string;
}
