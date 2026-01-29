/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UnauthorizedException,
  UseGuards,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import type { AuthenticatedRequest } from '@/common/types/authenticated-request.interface';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { RefreshJwtAuthGuard } from './guard/refresh-jwt-auth.guard';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() req: AuthenticatedRequest, @Res() res: Response) {
    const user = req.user;
    if (!user) {
      throw new UnauthorizedException();
    }

    const tokens = this.authService.login(user);
    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      secure: false, // Set to true in production with HTTPS
      sameSite: 'strict',
    });
    return res.json({ access_token: tokens.access_token, user: tokens.user });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req: AuthenticatedRequest) {
    return req.user;
  }

  @UseGuards(RefreshJwtAuthGuard)
  @Post('/refresh')
  refresh(@Request() req: AuthenticatedRequest, @Res() res: Response) {
    const user = req.user;
    if (!user) {
      throw new UnauthorizedException();
    }

    const tokens = this.authService.refresh(user);
    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      secure: false, // Set to true in production with HTTPS
      sameSite: 'strict',
    });
    return res.json({ access_token: tokens.access_token, user: tokens.user });
  }
}
