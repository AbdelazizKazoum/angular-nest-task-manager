import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './repositories/user.repository';
import { DatabaseModule } from '../../core/database/database.module';
import { User, UserSchema } from './entities/user.schema';

@Module({
  imports: [
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    DatabaseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
