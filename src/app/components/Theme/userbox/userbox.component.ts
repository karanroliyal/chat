import { Component } from '@angular/core';
import { globalRouting } from '../../../services/global-routing';
import { OnInit } from '@angular/core';
import { SocketService } from '../../../services/socket.service';

interface user{
  userId: string,
}

@Component({
  selector: 'app-userbox',
  imports: [],
  templateUrl: './userbox.component.html',
  styleUrl: './userbox.component.css'
})


export class UserboxComponent implements OnInit{

  constructor(private GS: globalRouting , private socket: SocketService){}

  users: user[] = []

  ngOnInit(): void {
    this.socket.connect();
    this.socket.socket.on('connected-users', (connectedUsers: string[]) => {
      connectedUsers.forEach((ele)=>{
        this.users.unshift({userId:ele});
      })
    });
    this.socket.socket.on('user-joined', (recentConnectedUser: string) => {
        this.users.unshift({userId:recentConnectedUser});
    });
    
    this.socket.socket.on('user-disconnected', (disconnectedUsers: string)=>{
      console.log(disconnectedUsers , 'disconnected user ')
    });
    // Listening for user disconnect events
    this.socket.socket.on('user-disconnect', (disconnectedUserId: string) => {
      this.users = this.users.filter((ele)=>ele.userId != disconnectedUserId)
    });
  }

}
