import { PrismaClient } from '@prisma/client';
import { openDealsSeeds } from './seeds/open-deals.seeds';

async function seedDatabase() {
  const prisma = new PrismaClient();

  try {
    await prisma.openDeals.createMany({
      data: openDealsSeeds,
    });
    console.log('Seed data inserted successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();