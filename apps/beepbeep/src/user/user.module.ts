/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from '../../../../libs/database/src/database.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
  imports: [DatabaseModule],
})
export class UserModule {}
