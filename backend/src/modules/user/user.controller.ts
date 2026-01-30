import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from './dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.userService.createUser(createUserDto);
    return plainToClass(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userService.findAllUsers();
    return users.map((user) =>
      plainToClass(UserResponseDto, user, {
        excludeExtraneousValues: true,
      }),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    const user = await this.userService.findUserById(id);
    return plainToClass(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.userService.updateUser(id, updateUserDto);
    return plainToClass(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<UserResponseDto | null> {
    const user = await this.userService.deleteUser(id);
    return user
      ? plainToClass(UserResponseDto, user, {
          excludeExtraneousValues: true,
        })
      : null;
  }
}
