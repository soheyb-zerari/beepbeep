/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

type AuthInput = { username: string, password: string }
type SignInData = { userId: string, username: string }
type AuthResult = { accessToken: string, userId: string, username: string }

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(user: SignInData): Promise<AuthResult> {
    const payload = { username: user.username, sub: user.userId };

    const accessToken = await this.jwtService.signAsync(payload);
    return {
      accessToken,
      userId: user.userId,
      username: user.username,
    };
  }

  async validateUser(input: AuthInput): Promise<SignInData | null> {
    const user = await this.userService.findByUsername(input.username);

    if (user && user.password === input.password) {
      return { userId: user.id, username: user.username };
    }

    return null;
  }
}
