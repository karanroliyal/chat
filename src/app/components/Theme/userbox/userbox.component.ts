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

  users: user[] = [{userId:''}]

  ngOnInit(): void {
    this.socket.connect();
    // this.socket.socket.on('user-joined' , (data:string)=>{
    //   this.users.unshift({userId:data})
    // })
    this.socket.socket.on('connected-users', (users: string[]) => {
      users.forEach((ele)=>{
        this.users.push({userId:ele})
      })
    });
    console.log(this.users)
  }



}
