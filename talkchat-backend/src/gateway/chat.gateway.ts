import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class ChatGateway {
  constructor() {}
  

  @WebSocketServer()
  server: Server;

  // ---- listen if new msg
  @SubscribeMessage('new-msg')
  handleNewMessage(@MessageBody() data: any) {
    this.server.emit('new-msg-received', { channelId: data.channelId });
  }

  // ---- listen if new channel
  @SubscribeMessage('new-channel')
  handleNewChannel(@MessageBody() data: any) {
    this.server.emit('new-channel-received', { channelId: data.channelId });
  }
 
}
