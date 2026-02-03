import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from '../core/core.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [CoreModule, UserModule, AuthModule, ProjectModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
