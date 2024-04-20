import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SeedService } from 'prisma/seeds/seed.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { OpenDealsModule } from './open-deals/open-deals.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UserModule, OpenDealsModule],
  providers: [PrismaService, SeedService],
})
export class AppModule {}
