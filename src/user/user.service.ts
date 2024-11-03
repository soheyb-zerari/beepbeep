/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  findAll() {
    return this.databaseService.user.findMany();
  }

  findOne(id: string) {
    return this.databaseService.user.findUnique({
      where: { id: id },
    });
  }

  findByUsername(username: string) {
    return this.databaseService.user.findUnique({
      where: { username: username },
    });
  }
}
