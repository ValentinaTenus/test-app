import { Injectable } from '@nestjs/common';
import { CreateOpenDealDto } from './dto/create-open-deal.dto';
import { UpdateOpenDealDto } from './dto/update-open-deal.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OpenDealsService {
  constructor(private prisma: PrismaService) {}

  create(createOpenDealDto: CreateOpenDealDto) {
    return this.prisma.openDeals.create({
      data: createOpenDealDto,
    });
  }

  findAll() {
    return this.prisma.openDeals.findMany();
  }

  findOne(id: string) {
    return this.prisma.openDeals.findUnique({
      where: { id },
    });
  }

  update(id: string, updateOpenDealDto: UpdateOpenDealDto) {
    return this.prisma.openDeals.update({
      where: { id },
      data: updateOpenDealDto,
    });
  }

  remove(id: string) {
    return this.prisma.openDeals.delete({
      where: { id },
    });
  }
}
