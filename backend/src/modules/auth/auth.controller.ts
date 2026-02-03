import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UnauthorizedException,
  UseGuards,
  Res,
  HttpStatus, // Import HttpStatus
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
    // Explicitly setting path to '/' ensures we can clear it from anywhere later
    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      secure: false, // Set to true in production with HTTPS
      sameSite: 'strict',
      path: '/', // This path is important for clearing the cookie
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
      secure: false, // Set to true in production
      sameSite: 'strict',
      path: '/',
    });
    return res.json({ access_token: tokens.access_token, user: tokens.user });
  }

  // 👇 ADD THIS METHOD
  @Post('/logout')
  logout(@Res() res: Response) {
    // We clear the cookie by setting it to empty and expiring it immediately
    // IMPORTANT: The options (httpOnly, secure, path) must match exactly what was used to create it
    res.clearCookie('refresh_token', {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      path: '/',
    });

    return res
      .status(HttpStatus.OK)
      .json({ message: 'Logged out successfully' });
  }
}
