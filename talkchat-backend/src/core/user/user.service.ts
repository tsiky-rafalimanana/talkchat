import { Injectable } from '@nestjs/common';
import { Not } from 'typeorm';
import { Channel } from '../../models/channel/entity/channel.entity';
import { User } from '../../models/user/entity/user.entity';

@Injectable()
export class UserService {
  constructor() {}

  async getAllUsers(currentUser: User) {
    // get all user except current
    const users: any = await User.find({
      where: {
        id: Not(currentUser.id),
      },
    });
    for (const item of users) {
      const channels = await this.getUsersDMChannel(item.id, currentUser.id);
      item.channelId = channels[0] ? channels[0].id : null;
      delete item.password;
    }
    return users;
  }

  async getUsersDMChannel(userId: string, currentUserId: string) {
    const channels = await Channel.createQueryBuilder('channel')
    .innerJoinAndSelect('channel.members', 'user')
    .where('channel.direct = 1')
    .andWhere('user.id In (:...userIds)', {
      userIds: [userId, currentUserId],
    })
    .getMany();
    const result = channels.filter(
      (i) =>
        i.members.length === 2 &&
        i.members.find((m) => m.id === currentUserId) &&
        i.members.find((m) => m.id === userId),
    );
    return result;
  }
}
