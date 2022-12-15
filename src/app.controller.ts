import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('root')
  async getStatus(@Res() response): Promise<string> {
    return response.status(HttpStatus.BAD_REQUEST).send({
      error: true,
    });
    // return await this.appService.getStatus('s');
  }
}