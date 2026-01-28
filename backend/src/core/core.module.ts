import { Global, Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './logger/logger.module';
import * as Joi from 'joi';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(
      Joi.object({
        MONGO_URI: Joi.string().required(),
        NODE_ENV: Joi.string()
          .valid('development', 'production')
          .default('development'),
      }),
    ),
    DatabaseModule,
    LoggerModule,
  ],
  exports: [ConfigModule, DatabaseModule, LoggerModule],
})
export class CoreModule {}
