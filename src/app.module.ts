import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { MembersModule } from './members/members.module';
import { PrismaModule } from './prisma/prisma.module';
import { LoansModule } from './loans/loans.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [BooksModule, MembersModule, PrismaModule, LoansModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
