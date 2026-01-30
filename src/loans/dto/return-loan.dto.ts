import { IsInt, IsPositive } from 'class-validator';

export class ReturnLoanDto {
  @IsInt()
  @IsPositive()
  id: number;
}
