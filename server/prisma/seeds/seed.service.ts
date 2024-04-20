import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../src/prisma.service';
import { openDealsSeeds } from './open-deals.seeds';

@Injectable()
export class SeedService {
  constructor(private readonly prisma: PrismaService) {}

  async seedOpenDeals() {
    for (const openDealsData of openDealsSeeds) {
      await this.prisma.openDeals.create({
        data: openDealsData,
      });
    }
  }
}