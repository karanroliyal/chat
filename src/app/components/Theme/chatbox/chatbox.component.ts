import { Component , OnInit } from '@angular/core';
import { SocketService } from '../../../services/socket.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-chatbox',
  imports: [ReactiveFormsModule],
  templateUrl: './chatbox.component.html',
  styleUrl: './chatbox.component.css'
})
export class ChatboxComponent implements OnInit{

  messages :{text:string , isMine: boolean}[] = [];

  constructor(private socket: SocketService){}

  ngOnInit(): void {
    // this.socket.connect();
    this.socket.onMessage((data:string)=>{
      console.log('Received from server:', data);
      this.messages.push({text:data , isMine:false})
    })
    
  }

  sendMessage(message:string){
    if(this.chatForm.valid && message.trim() != ''){
      this.messages.push({text:message , isMine:true})
      this.socket.sendMessage(message)
    }
  }

  clearInput(inputElement: HTMLInputElement) {
    inputElement.value = '';
  }

  chatForm  = new FormGroup({
    message: new FormControl('',[Validators.required,Validators.min(1)])
  })

}
