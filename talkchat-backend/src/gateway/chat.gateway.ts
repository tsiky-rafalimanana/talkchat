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
  afterInit(server: Server) {
    console.log('App Gateway Initialized');
  }

  @WebSocketServer()
  server: Server;

  // ---- listen if new msg
  @SubscribeMessage('new-msg')
  handleReadyToVote(@MessageBody() data: any) {
    console.log(
      '🚀 ~ file: chat.gateway.ts ~ line 19 ~ ChatGateway ~ handleReadyToVote ~ data',
      data,
    );
    this.server.emit('new-msg-received', { channelId: data.channelId });
  }
 
}
