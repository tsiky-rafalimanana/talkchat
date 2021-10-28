import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../security/auth.guard';
import { CurrentUser } from '../../security/currentUser.decorator';
import { NewMessageDTO } from './dto/new-message.dto';
import { MessageService } from './message.service';

@Controller('message')
@UseGuards(AuthGuard)
export class MessageController {
  constructor(private readonly msgService: MessageService) {}

  @Post('/new')
  async addChannel(@Body() data: NewMessageDTO, @CurrentUser() me) {
    
    try {
      const result = await this.msgService.newMessage(data, me);
      return {
        success: true,
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        message: error,
      };
    }
  }
}
