/* eslint-disable prettier/prettier */
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from '@prisma/client';
import { Roles } from 'src/auth/role.decorator';
import { PassportJwtGuard } from 'src/auth/guards/passport-jwt.guard';

@UseGuards(PassportJwtGuard, RolesGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Roles(Role.DISPATCHER)
  @Get()
  httpFindAll() {
    return this.userService.findAll();
  }
  
  @Roles(Role.DISPATCHER)
  @Get(':id')
  httpFindOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

}
