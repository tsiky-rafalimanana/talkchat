import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../security/auth.guard';
import { CurrentUser } from '../../security/currentUser.decorator';
import { ChannelService } from './channel.service';
import { ChannelAddDTO } from './dto/channel-add.dto';

@Controller('channel')
@UseGuards(AuthGuard)
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Post('/new')
  async addChannel(@Body() data: ChannelAddDTO, @CurrentUser() me) {
    
    try {
      const result = await this.channelService.addNewChannel(data, me);
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
  @Get('/:id')
  async getChannel(@Param('id') channelId: string, @CurrentUser() me) {
    try {
      const result = await this.channelService.getChannelById(channelId);
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


