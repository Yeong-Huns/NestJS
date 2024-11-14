import {Controller, Get, Post, Put, Patch, Delete} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  //@Get()
  //@Post()
  //@Put()
  //@Patch()
  @Delete()
  getHello(): string {
    return 'Hello yeong-Hun'
    //return this.appService.getHello();
  }
}
