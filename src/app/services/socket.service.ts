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

    // Disconnect
    this.socket.on('disconnect', () => console.log('Disconnected from WebSocket.'));
  }

  sendMessage(message: string): void {
    this.socket.emit('message', message);
  }

  onMessage(callback: (data: string) => void): void {
    this.socket.on('message', callback);
  }

  deleteUser(callback: (data: string) => void): void {
    this.socket.on('disconnect', callback);
  }


  disconnect(): void {
    if (this.socket) this.socket.disconnect();
  }

}
