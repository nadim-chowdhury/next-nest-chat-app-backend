import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class MeetingGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    console.log('WebSocket server initialized');
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinMeeting')
  handleJoinMeeting(client: Socket, meetingId: string) {
    client.join(meetingId);
    client.broadcast.to(meetingId).emit('userJoined', client.id);
  }

  @SubscribeMessage('signal')
  handleSignal(client: Socket, payload: { meetingId: string; signal: any }) {
    client.broadcast.to(payload.meetingId).emit('signal', {
      userId: client.id,
      signal: payload.signal,
    });
  }
}
