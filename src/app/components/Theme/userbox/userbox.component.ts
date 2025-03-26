import { Component } from '@angular/core';
import { globalRouting } from '../../../services/global-routing';
import { OnInit } from '@angular/core';
import { SocketService } from '../../../services/socket.service';

interface user{
  name: string,
  profile:string
}

@Component({
  selector: 'app-userbox',
  imports: [],
  templateUrl: './userbox.component.html',
  styleUrl: './userbox.component.css'
})


export class UserboxComponent implements OnInit{

  constructor(private GS: globalRouting , private socket: SocketService){}

  users: user[] = [
    {
      name : 'karan rawat',
      profile : '../assets/user.png',
    }
  ]

  ngOnInit(): void {
    this.getUserData();
    this.socket.connect();
  }



  getUserData(){

    this.GS.api('user-data' , '' , '' ).subscribe((res:any)=>{
      this.users = res;
    })

  }

}
