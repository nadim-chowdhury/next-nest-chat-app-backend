import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { SendMessageDto } from './dto/send-message.dto';

@WebSocketGateway()
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  constructor(private readonly chatService: ChatService) {}

  afterInit(server: Server) {
    console.log('Init');
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    client: Socket,
    payload: { chatId: string; userId: string; content: string },
  ) {
    const message: SendMessageDto = { content: payload.content };
    const chat = await this.chatService.sendMessage(
      payload.chatId,
      payload.userId,
      message,
    );
    this.server.to(payload.chatId).emit('receiveMessage', chat);
  }

  @SubscribeMessage('joinChat')
  handleJoinChat(client: Socket, chatId: string) {
    client.join(chatId);
    console.log(`Client ${client.id} joined chat ${chatId}`);
  }
}

 import {
   SubscribeMessage,
   WebSocketGateway,
   WebSocketServer,
   OnGatewayInit,
   OnGatewayConnection,
   OnGatewayDisconnect,
 } from '@nestjs/websockets';
 import { Server, Socket } from 'socket.io';
 import { ChatService } from './chat.service';
 import { SendMessageDto } from './dto/send-message.dto';

 @WebSocketGateway()
 export class ChatGateway
   implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
 {
   @WebSocketServer() server: Server;

   constructor(private readonly chatService: ChatService) {}

   afterInit(server: Server) {
     console.log('WebSocket server initialized');
   }

   handleConnection(client: Socket) {
     console.log(`Client connected: ${client.id}`);
   }

   handleDisconnect(client: Socket) {
     console.log(`Client disconnected: ${client.id}`);
   }

   @SubscribeMessage('sendMessage')
   async handleMessage(
     client: Socket,
     payload: { chatId: string; userId: string; content: string },
   ) {
     const message: SendMessageDto = { content: payload.content };
     const chat = await this.chatService.sendMessage(
       payload.chatId,
       payload.userId,
       message,
     );
     this.server.to(payload.chatId).emit('receiveMessage', chat);
   }

   @SubscribeMessage('joinChat')
   handleJoinChat(client: Socket, chatId: string) {
     client.join(chatId);
     console.log(`Client ${client.id} joined chat ${chatId}`);
   }
 }

 import {
   WebSocketGateway,
   WebSocketServer,
   OnGatewayInit,
   OnGatewayConnection,
   OnGatewayDisconnect,
 } from '@nestjs/websockets';
 import { Server, Socket } from 'socket.io';
 import { UserService } from '../user/user.service';

 @WebSocketGateway()
 export class ChatGateway
   implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
 {
   @WebSocketServer() server: Server;

   constructor(private readonly userService: UserService) {}

   afterInit(server: Server) {
     console.log('WebSocket server initialized');
   }

   async handleConnection(client: Socket) {
     const userId = client.handshake.query.userId;
     await this.userService.updateUserStatus(userId, true);
     this.server.emit('userStatus', { userId, status: 'online' });
   }

   async handleDisconnect(client: Socket) {
     const userId = client.handshake.query.userId;
     await this.userService.updateUserStatus(userId, false);
     this.server.emit('userStatus', { userId, status: 'offline' });
   }
 }