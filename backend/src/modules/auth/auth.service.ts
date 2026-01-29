/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
// import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.schema';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import type { AuthUser } from '../../common/types/authenticated-request.interface';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(dto: LoginDto): Promise<User | null> {
    const user = await this.userService.findUserByEmailWithPassword(dto.email);
    if (user && (await bcrypt.compare(dto.password, user.password))) {
      const { password, ...result } = user;
      return result as User;
    }
    return null;
  }

  login(user: AuthUser) {
    const payload = {
      email: user.email,
      name: user.name,
      sub: user._id ?? user.id,
    };

    return {
      user: {
        id: user._id ?? user.id,
        email: user.email,
        name: user.name,
      },
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  refresh(user: AuthUser) {
    const payload = {
      email: user.email,
      name: user.name,
      sub: user._id ?? user.id,
    };

    return {
      user: {
        id: user._id ?? user.id,
        email: user.email,
        name: user.name,
      },
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
