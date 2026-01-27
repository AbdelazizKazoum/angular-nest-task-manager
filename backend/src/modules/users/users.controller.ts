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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from './dto';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.usersService.createUser(createUserDto);
    return new UserResponseDto(user);
  }

  @Get()
  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.usersService.findAllUsers();
    return users.map((user) => new UserResponseDto(user));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    const user = await this.usersService.findUserById(id);
    return new UserResponseDto(user);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.usersService.updateUser(id, updateUserDto);
    return new UserResponseDto(user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<UserResponseDto | null> {
    const user = await this.usersService.deleteUser(id);
    return user ? new UserResponseDto(user) : null;
  }
}
