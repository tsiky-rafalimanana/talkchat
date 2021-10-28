import { Injectable } from '@nestjs/common';
import { Channel } from '../../models/channel/entity/channel.entity';
import { User } from '../../models/user/entity/user.entity';
import { ChannelAddDTO } from './dto/channel-add.dto';

@Injectable()
export class ChannelService {
  constructor() {}

  async addNewChannel(data: ChannelAddDTO, creator: User) {
    const channelInstance: any = { ...data };
    channelInstance.owner = creator.id;
    channelInstance.members = data.members;
    const newChannel = await Channel.getRepository().save(channelInstance);
    return newChannel;
  }

  async getChannelById(channelId: string) {
    const channel = await Channel.findOne(channelId);
    channel.messages.sort(
      (a: any, b: any) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    );
    return channel;
  }
}
