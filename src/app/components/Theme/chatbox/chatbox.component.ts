import { Component , ElementRef, OnInit, ViewChild } from '@angular/core';
import { SocketService } from '../../../services/socket.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-chatbox',
  imports: [ReactiveFormsModule],
  templateUrl: './chatbox.component.html',
  styleUrl: './chatbox.component.css'
})
export class ChatboxComponent implements OnInit{

  @ViewChild('messageContainer') messageContainer!: ElementRef;

  messages :{text:string , isMine: boolean}[] = [];

  constructor(private socket: SocketService){}

  ngOnInit(): void {
    this.socket.onMessage((data:string)=>{
      this.messages.push({text:data , isMine:false})
      this.scrollToBottom();
    })
    this.socket.socket.on('user-joined',(newUser)=>{
      this.messages.push({text:`Joined : ${newUser}` , isMine:false})
    })
    // Listening for user disconnect events
    this.socket.socket.on('user-disconnect', (disconnectedUserId: string) => {
      this.messages.push({text:`left : ${disconnectedUserId}` , isMine:false})
    });

  }

  sendMessage(message:string){
    if(this.chatForm.valid && message.trim() != ''){
      this.messages.push({text:message , isMine:true})
      this.socket.sendMessage(message)
      this.scrollToBottom();
    }
  }

  clearInput(inputElement: HTMLInputElement) {
    inputElement.value = '';
  }

  chatForm  = new FormGroup({
    message: new FormControl('',[Validators.required,Validators.min(1)])
  })

  scrollToBottom() {
    setTimeout(() => {
      if (this.messageContainer) {
        this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
      }
    }, 100);
  }

}
