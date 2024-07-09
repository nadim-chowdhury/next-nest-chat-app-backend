// import { Controller, Request, Post, UseGuards } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { LocalAuthGuard } from './local-auth.guard';

// @Controller('auth')
// export class AuthController {
//   constructor(private authService: AuthService) {}

//   @Post('register')
//   async register(@Request() req) {
//     return this.authService.register(req.body);
//   }

//   @UseGuards(LocalAuthGuard)
//   @Post('login')
//   async login(@Request() req) {
//     return this.authService.login(req.user);
//   }
// }

// import { Controller, Post, Body } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { RegisterUserDto } from './dto/register-user.dto';
// import { User } from '../schemas/user.schema';

// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   @Post('register')
//   async register(@Body() registerUserDto: RegisterUserDto): Promise<User> {
//     return this.authService.register(registerUserDto);
//   }
// }

import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from '../schemas/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto): Promise<User> {
    return this.authService.register(registerUserDto);
  }

  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<{ access_token: string }> {
    return this.authService.login(loginUserDto);
  }
}

// import {
//   Controller,
//   Post,
//   Get,
//   Request,
//   Body,
//   UseGuards,
// } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { RegisterUserDto } from './dto/register-user.dto';
// import { LoginUserDto } from './dto/login-user.dto';
// import { User } from '../schemas/user.schema';
// import { JwtAuthGuard } from './jwt-auth.guard';

// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   @Post('register')
//   async register(@Body() registerUserDto: RegisterUserDto): Promise<User> {
//     return this.authService.register(registerUserDto);
//   }

//   @Post('login')
//   async login(
//     @Body() loginUserDto: LoginUserDto,
//   ): Promise<{ access_token: string }> {
//     return this.authService.login(loginUserDto);
//   }

//   @UseGuards(JwtAuthGuard)
//   @Get('me')
//   async getProfile(@Request() req): Promise<{ username: string }> {
//     return this.authService.getUserProfile(req.user.userId);
//   }
// }

import {
  Controller,
  Post,
  Get,
  Put,
  Request,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../schemas/user.schema';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto): Promise<User> {
    return this.authService.register(registerUserDto);
  }

  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<{ access_token: string }> {
    return this.authService.login(loginUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req): Promise<{ username: string }> {
    return this.authService.getUserProfile(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('me')
  async updateProfile(
    @Request() req,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.authService.updateUserProfile(req.user.userId, updateUserDto);
  }
}
