import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { openDealsSeeds } from 'prisma/seeds/open-deals.seeds';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super();
  }

  async onModuleInit() {
    await this.$connect();
    await this.seedDatabase();
  }

  async seedDatabase() {
    try {
      await this.openDeals.createMany({
        data: openDealsSeeds,
      });
      console.log('Seed data inserted successfully');
    } catch (error) {
      console.error('Error seeding database:', error);
    }
  }

  async close() {
    await this.$disconnect();
  }
}
