import { Injectable } from '@nestjs/common';
import { Message } from '../../models/message/entity/message.entity';
import { User } from '../../models/user/entity/user.entity';
import { NewMessageDTO } from './dto/new-message.dto';

@Injectable()
export class MessageService {
  constructor() {}

  async newMessage(data: NewMessageDTO, sender: User) {
    const messageInstance: any = {...data, owner: sender.id} ;
    const newMsg = await Message.getRepository().save(messageInstance);
    return newMsg;
  }
}
