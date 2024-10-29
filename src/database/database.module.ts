/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { DATABASE_CONNECTION } from './database-connection';
import * as restaurantSchema from '../restaurant/schema';

@Module({
  providers: [
    {
      provide: DATABASE_CONNECTION,
      useFactory: (configService: ConfigService) => {
        const pool = new Pool({
          connectionString: configService.getOrThrow('DATABASE_URL'),
          ssl: true,
        });

        return drizzle(pool, {
          schema: {
            ...restaurantSchema,
          },
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class DatabaseModule {}
