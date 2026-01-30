import { IsInt, IsPositive } from 'class-validator';

export class BorrowLoanDto {
  @IsInt()
  @IsPositive()
  bookId: number;

  @IsInt()
  @IsPositive()
  memberId: number;
}
