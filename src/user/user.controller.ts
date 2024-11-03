/* eslint-disable prettier/prettier */
import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  httpFindAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  httpFindOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

}
