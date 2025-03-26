import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})


export class SocketService {


  public socket!: Socket;

  constructor(){
    // this.connect()
  }

  connect(): void{
    // Ensure the path matches backend Socket.IO setup
    this.socket = io('http://localhost:8000', {
      path: '/sock' // Use custom path defined on the backend
    });
    this.socket.on('connect', () => console.log('Connected to WebSocket!'));

    // Handle the list of connected users
    this.socket.on('connected-users', (users: string[]) => {
      console.log('Connected users:', users);
    });
    
    // Listen for user-joined broadcast
    this.socket.on('user-joined', (data: string) => console.log('🔔', data));

    // User disconnecting
    this.socket.on('disconnect', () => console.log('Disconnected from WebSocket.'));
  }

  sendMessage(message: string): void {
    this.socket.emit('message', message);
  }

  onMessage(callback: (data: string) => void): void {
    this.socket.on('message', callback);
  }

  disconnect(): void {
    if (this.socket) this.socket.disconnect();
  }
}
