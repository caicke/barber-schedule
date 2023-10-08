import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { BarberController } from './barber/barber.controller';
import { BarberService } from './barber/barber.service';
import { BarberModule } from './barber/barber.module';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    BarberModule
  ],
  controllers: [AppController, BarberController],
  providers: [AppService, BarberService],
})
export class AppModule {}
