import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3002', // 允许的前端地址，这里要注意配置跨域问题
  },
})
export class WebsocketGateway
  implements
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  currentUsers = 0

  /** 当 WebSocket Gateway 初始化完成时，我们向所有客户端广播当前的用户人数。 */
  afterInit() {
    this.server.emit('usersCount', this.currentUsers);
  }
  handleConnection(socket: Socket) {
    this.incrementUsersCount();
    this.server.emit('usersCount', this.currentUsers);
  }

  handleDisconnect(socket: Socket) {
    this.decrementUsersCount();
    this.server.emit('usersCount', this.currentUsers);
  }

  incrementUsersCount() {
    this.currentUsers++;
  }

  decrementUsersCount() {
    this.currentUsers--;
  }
}
