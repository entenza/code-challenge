import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { IGetNewsRequest } from '../interfaces/get-news.request.interface';

export class GetNewsRequest implements IGetNewsRequest {
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

  @IsOptional()
  @ApiProperty({
    required: false,
  })
  page: number;

  @IsOptional()
  @ApiProperty({
    required: false,
  })
  limit: number;
}
