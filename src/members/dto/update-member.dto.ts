import { IsOptional, IsString } from 'class-validator';
export class UpdateMemberDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  className?: string;
}
