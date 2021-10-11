import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/world')
  getWorld() {
    return 'world!'
  }
  @Get('/json')
  getJson() {
    return {foo: 'baz', bar: 14}
  }
}
