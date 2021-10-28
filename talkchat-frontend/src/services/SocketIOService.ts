import socketIOClient from 'socket.io-client';

const API_URL =
  process.env.REACT_APP_GATEWAY_WEBSOCKET_URL || 'http://localhost:3000';

export const socket = socketIOClient(API_URL);


class SocketIOService {
  static emitNewMessage(data: any) {
    socket.emit('new-msg', data);
  }

  static listenNewMsg(onComplete: any) {
    socket.on('new-msg-received', (data: any) => {
      onComplete(data);
    });
  }
  
}

export default SocketIOService;
