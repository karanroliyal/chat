import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { globalRouting } from '../../services/global-routing';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="GS.alertBox" class="toast-container position-fixed top-0 end-0 p-3" style="z-index: 9999">
      <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header" [ngClass]="'bg-' + GS.alertType">
          <strong class="me-auto text-white">Notification</strong>
          <button type="button" class="btn-close" (click)="closeToast()" aria-label="Close"></button>
        </div>
        <div class="toast-body">
          {{ GS.alertContent }}
        </div>
      </div>
    </div>
  `,
  styles: [`
    .toast-container {
      min-width: 300px;
    }
    .toast {
      background: white;
      border-radius: 4px;
      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    }
    .toast-header {
      color: white;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }
    .btn-close {
      filter: brightness(0) invert(1);
    }
  `]
})
export class ToastComponent implements OnInit {
  constructor(public GS: globalRouting) {}

  ngOnInit(): void {}

  closeToast(): void {
    this.GS.alertBox = false;
  }
} 