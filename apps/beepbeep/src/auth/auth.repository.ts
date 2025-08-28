/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from "bcrypt";
import { CreateUserDto } from '../user/dtos/createUser.dto';
import { Role, User } from '@prisma/client';

type SignInData = { userId: string, phone: string, role: Role }
type AuthResult = { accessToken: string, userId: string }

@Injectable()
export class AuthRepository {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(user: SignInData): Promise<AuthResult> {
    const payload = { phone: user.phone, sub: user.userId, role: user.role };

    const accessToken = await this.jwtService.signAsync(payload);
    return {
      accessToken,
      userId: user.userId,
    };
  }

  async signUp(user: CreateUserDto, password: string): Promise<User | null> {
    const hashedPassword = await bcrypt.hash(password, 13);
    return await this.userService.createUser({...user, password: hashedPassword});
  }
}
