/* eslint-disable prettier/prettier */
import { Request, Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportLocalGuard } from './guards/passport-local.guard';
import { CreateUserDto } from '../user/dtos/createUser.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("login")
    @UseGuards(PassportLocalGuard)
    async login(@Request() request) {
        return await this.authService.signIn(request.user);
    }
    
    @Post("register")
    async signUp(@Body() createUserDto: CreateUserDto) {
        return await this.authService.signUp(createUserDto);
    }

}
