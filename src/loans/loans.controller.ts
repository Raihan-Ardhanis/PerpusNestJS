import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { LoansService } from './loans.service';
import { BorrowLoanDto } from './dto/borrow-loan.dto';
import { ReturnLoanDto } from './dto/return-loan.dto';

@Controller('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  // PINJAM
  @Post('borrow')
  borrow(@Body() dto: BorrowLoanDto) {
    return this.loansService.borrowBook(dto);
  }

  // KEMBALI
  @Post('return')
  returnBook(@Body() dto: ReturnLoanDto) {
    return this.loansService.returnBook(dto.id);
  }

  // SEMUA RIWAYAT
  @Get()
  findAll() {
    return this.loansService.findAll();
  }

  // 🔥 DETAIL 1 PEMINJAMAN
  @Get('detail/:id')
  detail(@Param('id') id: string) {
    return this.loansService.findDetail(+id);
  }

  // 🔥 RIWAYAT MEMBER
  @Get('history/member/:memberId')
  historyMember(@Param('memberId') memberId: string) {
    return this.loansService.historyByMember(+memberId);
  }

  // 🔥 RIWAYAT BUKU
  @Get('history/book/:bookId')
  historyBook(@Param('bookId') bookId: string) {
    return this.loansService.historyByBook(+bookId);
  }
}
