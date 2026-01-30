import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BorrowLoanDto } from './dto/borrow-loan.dto';

@Injectable()
export class LoansService {
  constructor(private prisma: PrismaService) {}

  async borrowBook(dto: BorrowLoanDto) {
    return await this.prisma.loan.create({
    data: {
        bookId: dto.bookId,
        memberId: dto.memberId,
      },
    });
  }


  async returnBook(id: number) {
    const loan = await this.prisma.loan.findUnique({ where: { id } });

    if (!loan) throw new NotFoundException('Peminjaman tidak ditemukan');
    if (loan.status === 'RETURNED') throw new BadRequestException('Buku sudah dikembalikan');

    return await this.prisma.loan.update({
      where: { id },
      data: {
        status: 'RETURNED',
        returnDate: new Date(),
        details: {
          create: { action: 'RETURN' },
        },
      },
    });
  }

  async findAll() {
    return await this.prisma.loan.findMany({
      include: {
        book: true,
        member: true,
      },
    });
  }

  async findDetail(id: number) {
    return await this.prisma.loan.findUnique({
      where: { id },
      include: {
        book: true,
        member: true,
        details: true,
      },
    });
  }

  async historyByMember(memberId: number) {
    return await this.prisma.loan.findMany({
      where: { memberId },
      include: {
        book: true,
        details: true,
      },
      orderBy: {
        loanDate: 'desc',
      },
    });
  }

  async historyByBook(bookId: number) {
    return await this.prisma.loan.findMany({
      where: { bookId },
      include: {
        member: true,
        details: true,
      },
      orderBy: {
        loanDate: 'desc',
      },
    });
  }
}
