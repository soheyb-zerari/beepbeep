/* eslint-disable prettier/prettier */
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '@prisma/client';
import { Roles } from '../auth/role.decorator';
import { PassportJwtGuard } from '../auth/guards/passport-jwt.guard';

@UseGuards(PassportJwtGuard, RolesGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Roles(Role.DISPATCHER, Role.DRIVER)
  @Get()
  async httpFindAll() {
    return await this.userService.findUserAll();
  }
  
  @Roles(Role.DISPATCHER)
  @Get(':id')
  async httpFindOne(@Param('id') id: string) {
    return await this.userService.findUserOne(id);
  }

}
