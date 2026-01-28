import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../entities/user.schema';
import { AbstractRepository } from '../../../core/database/abstract.repository';

@Injectable()
export class UserRepository extends AbstractRepository<User> {
  protected readonly logger = new Logger(User.name);

  constructor(
    @InjectModel(User.name)
    userModel: Model<User>,
  ) {
    super(userModel);
  }

  // Add any user-specific repository methods here
  async findByEmail(email: string): Promise<User> {
    return this.findOne({ email });
  }

  async findByEmailWithPassword(email: string): Promise<User> {
    return this.findOne({ email });
  }

  async existsByEmail(email: string): Promise<boolean> {
    const user = await this.model.findOne({ email }).lean();
    return !!user;
  }
}
