/* eslint-disable prettier/prettier */
import { Role } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsOptional, IsString, Length, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    @Length(10)
    phone: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @IsOptional()
    @IsEnum(Role)
    role?: Role
}