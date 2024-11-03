/* eslint-disable prettier/prettier */
import { Request, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportLocalGuard } from './guards/passport-local.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("login")
    @UseGuards(PassportLocalGuard)
    login(@Request() request) {
        return this.authService.signIn(request.user);
    }
}
