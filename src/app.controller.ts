import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class AppController {
  @Get()
  get() {
    return {
      message: 'Hello World!',
      developer: 'Paulo Lima',
      email: 'prmlimajr@hotmail.com',
      github: 'https://github.com/prmlimajr',
      linkedin: 'https://www.linkedin.com/in/prmlimajr/',
    };
  }
}
