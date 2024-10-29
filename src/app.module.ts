import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { RestaurantModule } from './restaurant/restaurant.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development', '.env.production'],
      isGlobal: true,
    }),
    DatabaseModule,
    RestaurantModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
