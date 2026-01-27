import { Injectable } from '@nestjs/common';
import { User } from './entities/user.schema';
import { UserRepository } from './repositories/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.create(createUserDto);
  }

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.findAll({});
  }

  async findUserById(id: string): Promise<User> {
    return this.userRepository.findOne({ _id: id });
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findByEmail(email);
  }

  async findUserByEmailWithPassword(email: string): Promise<User> {
    return this.userRepository.findByEmailWithPassword(email);
  }

  async existsByEmail(email: string): Promise<boolean> {
    return this.userRepository.existsByEmail(email);
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userRepository.findOneAndUpdate({ _id: id }, updateUserDto);
  }

  async deleteUser(id: string): Promise<User | null> {
    return this.userRepository.findOneAndDelete({ _id: id });
  }
}
