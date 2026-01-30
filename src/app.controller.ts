import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('welcome')
  getWelcome(): string {
    return this.appService.getWelcome();
  }
  @Get('penjumlahan')
  getPenjumlahan(): number {
    return this.appService.penjumlahan(12, 33);
  }
}
