import { Injectable } from '@nestjs/common';
import { Channel } from '../../models/channel/entity/channel.entity';
import { User } from '../../models/user/entity/user.entity';
import { ChannelAddDTO } from './dto/ChannelAddDto';

@Injectable()
export class ChannelService {
  constructor() {}

  async addNewChannel(data: ChannelAddDTO, creator: User) {
    const channelInstance: any = {...data};
    channelInstance.owner = creator.id;
    channelInstance.members = data.members;
    console.log("🚀 ~ file: channel.service.ts ~ line 14 ~ ChannelService ~ addNewChannel ~ channelInstance", channelInstance)
    const newChannel = await Channel.getRepository().save(channelInstance)
    return newChannel;
  }

  async getChannelById(channelId: string) {
    const channel = await Channel.findOne(channelId);
    return channel;
  }
}
