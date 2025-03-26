import { Component } from '@angular/core';
import { HeaderComponent } from '../Theme/header/header.component';
import { ChatboxComponent } from '../Theme/chatbox/chatbox.component';
import { UserboxComponent } from '../Theme/userbox/userbox.component';

@Component({
  selector: 'app-layout',
  imports: [ HeaderComponent , ChatboxComponent , UserboxComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
