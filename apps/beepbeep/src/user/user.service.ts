/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { Role } from '@prisma/client';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) { }

  async findUserAll() {
    return await this.userRepository.findUserAllDB();
  }

  async findUserOne(id: string) {
    return await this.userRepository.findUserOneDB(id);
  }

  async findUserByUsername(username: string) {
    return await this.userRepository.findUserByUsernameDB(username);
  }

  async findUserByPhone(phoneNumber: string) {
    return await this.userRepository.findUserByPhoneDB(phoneNumber);
  }

  async findUsersByRole(role: Role) {
    return await this.userRepository.findUsersByRoleDB(role)
  }

  async findUserById(id: string) {
    return await this.userRepository.findUserByIdDB(id)
  }

  async createUser(createUserDto: CreateUserDto) {
    return await this.userRepository.createUserDB(createUserDto);
  }
}
