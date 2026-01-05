import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';
import { LoggerModule } from './core/logger/logger.module';
import { ConfigModule } from './core/config/config.module';

@Module({
  imports: [DatabaseModule, LoggerModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
