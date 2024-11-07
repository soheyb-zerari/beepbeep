/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dtos/createUser.dto';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) { }

  findAll() {
    return this.databaseService.user.findMany();
  }

  findOne(id: string) {
    return this.databaseService.user.findUnique({
      where: { id: id },
    });
  }

  findByUsername(username: string) {
    return this.databaseService.user.findFirst({
      where: {
        username: username,
      },
    });
  }

  findByPhone(phoneNumber: string) {
    return this.databaseService.user.findUnique({
      where: { phone: phoneNumber },
    });
  }

  findById(id: string) {
    return this.databaseService.user.findUnique({
      where: { id: id },
    })
  }

  createUser(createUserDto: CreateUserDto) {
    return this.databaseService.user.create({
      data: createUserDto
    });
  }
}
