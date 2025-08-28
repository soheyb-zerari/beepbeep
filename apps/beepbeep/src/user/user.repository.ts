/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../../../libs/database/src/database.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { Role } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private readonly databaseService: DatabaseService) { }

  async findUserAllDB() {
    return await this.databaseService.user.findMany();
  }

  async findUserOneDB(id: string) {
    return await this.databaseService.user.findUnique({
      where: { id: id },
    });
  }

  async findUserByUsernameDB(username: string) {
    return await this.databaseService.user.findFirst({
      where: {
        username: username,
      },
    });
  }

  async findUserByPhoneDB(phoneNumber: string) {
    return await this.databaseService.user.findUnique({
      where: { phone: phoneNumber },
    });
  }

  async findUsersByRoleDB(role: Role) {
    return await this.databaseService.user.findMany({
      where: { role: role }
    })
  }

  async findUserByIdDB(id: string) {
    return await this.databaseService.user.findUnique({
      where: { id: id },
    })
  }

  async createUserDB(createUserDto: CreateUserDto) {
    return await this.databaseService.user.create({
      data: createUserDto
    });
  }
}
