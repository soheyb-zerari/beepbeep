/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from "bcrypt";
import { CreateUserDto } from '../user/dtos/createUser.dto';
import { Role, User } from '@prisma/client';
import { AuthRepository } from './auth.repository';

type AuthInput = { phone: string, password: string }
type SignInData = { userId: string, phone: string, role: Role }
type AuthResult = { accessToken: string, userId: string }

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userService: UserService,
  ) {}

  async signIn(user: SignInData): Promise<AuthResult> {
    return await this.authRepository.signIn(user);
  }

  async signUp(user: CreateUserDto): Promise<User | null> {
    const { phone, password } = user;

    const phoneInUse = await this.userService.findUserByPhone(phone);
    if (phoneInUse) throw new BadRequestException("Phone number already in use")

    return await this.authRepository.signUp(user, password);
  }

  async validateUser(input: AuthInput): Promise<SignInData | null> {
    const user = await this.userService.findUserByPhone(input.phone);

    if (user != null) {
      const isValidPassword = await bcrypt.compare(input.password, user.password);
      if (isValidPassword) {
        return { userId: user.id, phone: user.phone, role: user.role };
      }
    }
    
    throw new UnauthorizedException("Invalid credentials");
  }
}
