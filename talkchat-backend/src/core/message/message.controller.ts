import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../security/auth.guard';
import { CurrentUser } from '../../security/currentUser.decorator';

@Controller('message')
@UseGuards(AuthGuard)
export class MessageController {
  constructor() {

  }
  @Get('test')
  async test(@Param() data, @CurrentUser() user) {
    console.log("🚀 ~ file: message.controller.ts ~ line 13 ~ MessageController ~ test ~ user", user)
    return data;
  }
}
