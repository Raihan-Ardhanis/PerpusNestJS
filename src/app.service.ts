import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getWelcome(): string {
    return 'welcome to Library API';
  }
  penjumlahan(a: number, b: number): number {
    return a + b;
  }
}
