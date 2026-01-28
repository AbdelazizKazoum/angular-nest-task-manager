import { Injectable } from '@nestjs/common';
import { User } from './entities/user.schema';
import { UserRepository } from './repositories/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
    const userToCreate = {
      ...createUserDto,
      password: hashedPassword,
    };
    return this.userRepository.create(userToCreate as Omit<User, '_id'>);
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
    return this.userRepository.findOneAndUpdate(
      { _id: id },
      updateUserDto as Partial<User>,
    );
  }

  async deleteUser(id: string): Promise<User | null> {
    return this.userRepository.findOneAndDelete({ _id: id });
  }
}
