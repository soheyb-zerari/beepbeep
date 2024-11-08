/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from "bcrypt";
import { CreateUserDto } from 'src/user/dtos/createUser.dto';
import { Role } from '@prisma/client';

type AuthInput = { phone: string, password: string }
type SignInData = { userId: string, phone: string, role: Role }
type AuthResult = { accessToken: string, userId: string }

@Injectable()
export class AuthService {
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

  async signUp(user: CreateUserDto) {
    const { phone, password } = user;

    const phoneInUse = await this.userService.findByPhone(phone);

    if (phoneInUse) {
      throw new BadRequestException("Phone number already in use")
    }

    const hashedPassword = await bcrypt.hash(password, 13);

    return await this.userService.createUser({...user, password: hashedPassword});
  }

  async validateUser(input: AuthInput): Promise<SignInData | null> {
    const user = await this.userService.findByPhone(input.phone);

    if (user != null) {
      const isValidPassword = await bcrypt.compare(input.password, user.password);
      if (isValidPassword) {
        return { userId: user.id, phone: user.phone, role: user.role };
      }
    }
    
    throw new UnauthorizedException("Invalid credentials");
  }
}
