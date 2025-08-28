/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../../../libs/database/src/database.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { Role } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) { }

  findUserAll() {
    return this.databaseService.user.findMany();
  }

  findUserOne(id: string) {
    return this.databaseService.user.findUnique({
      where: { id: id },
    });
  }

  findUserByUsername(username: string) {
    return this.databaseService.user.findFirst({
      where: {
        username: username,
      },
    });
  }

  findUserByPhone(phoneNumber: string) {
    return this.databaseService.user.findUnique({
      where: { phone: phoneNumber },
    });
  }

  findUsersByRole(role: Role) {
    return this.databaseService.user.findMany({
      where: { role: role }
    })
  }

  findUserById(id: string) {
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
