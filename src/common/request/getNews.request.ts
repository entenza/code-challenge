import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class GetNewsRequest {
  @IsOptional()
  @ApiProperty({
    required: false,
  })
  author: string;

  @IsOptional()
  @ApiProperty({
    required: false,
  })
  tag: string;

  @IsOptional()
  @ApiProperty({
    required: false,
  })
  title: string;

  @IsOptional()
  @ApiProperty({
    required: false,
  })
  month: string;
}
