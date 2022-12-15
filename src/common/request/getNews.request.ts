import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class GetNewsRequest {
  @IsOptional()
  @ApiProperty()
  author: string;

  @IsOptional()
  @ApiProperty()
  tag: string;

  @IsOptional()
  @ApiProperty()
  title: string;

  @IsOptional()
  @ApiProperty()
  month: string;
}
