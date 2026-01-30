import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
@Injectable()
export class MembersService {
  constructor(private prisma: PrismaService) {}
  async create(dto: CreateMemberDto) {
    return this.prisma.member.create({ data: dto });
  }
  async findAll() {
    return this.prisma.member.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }
  async findOne(id: number) {
    const member = await this.prisma.member.findUnique({
      where: { id },
    });
    if (!member) throw new NotFoundException('Member notfound');
    return member;
  }
  async update(id: number, dto: UpdateMemberDto) {
    await this.findOne(id);
    return this.prisma.member.update({
      where: { id },
      data: dto,
    });
  }
  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.member.delete({ where: { id } });
    return { message: `Member with id ${id} deleted` };
  }
}
