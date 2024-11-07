/* eslint-disable prettier/prettier */
import { Request, Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportLocalGuard } from './guards/passport-local.guard';
import { CreateUserDto } from 'src/user/dtos/createUser.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("login")
    @UseGuards(PassportLocalGuard)
    login(@Request() request) {
        return this.authService.signIn(request.user);
    }
    
    @Post("register")
    signUp(@Body() createUserDto: CreateUserDto) {
        return this.authService.signUp(createUserDto);
    }

}
