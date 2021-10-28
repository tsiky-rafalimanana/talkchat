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
  async getUserChannel(userId: string) {
    const privateChannels = await Channel.createQueryBuilder('channel')
    .innerJoin('channel.members', 'user')
    .leftJoinAndSelect('channel.messages', 'message')
    .where('channel.private = 1')
    .andWhere('user.id = :userId', {
      userId
    })
    .getMany();

    const publicChannels = await Channel.createQueryBuilder('channel')
    .leftJoinAndSelect('channel.messages', 'message')
    .where('channel.public = 1')
    .getMany();

    const channels = [...privateChannels, ...publicChannels];
    
    for(const channel of channels) {
      
      channel.messages.sort(
        (a: any, b: any) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      );
    }
    return channels;
  }
}
