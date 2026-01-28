import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('/login')
  async login(@Body() body: { email: string; pass: string }) {
    console.log('🚀 ~ AuthController ~ login ~ body:', body);

    const user = await this.authService.validateUser(body.email, body.pass);
    if (!user) {
      throw new UnauthorizedException();
    }

    return this.authService.login(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
