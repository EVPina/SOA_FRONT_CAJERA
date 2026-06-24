import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.html',
  styleUrl: './notification.css'
})
export class Notification {
  notification: any = null;

  constructor(private notificationService: NotificationService) {
    this.notificationService.notification$.subscribe(notif => {
      this.notification = notif;
      console.log('Notificación recibida:', notif);
    });
  }

  getIcon(type: string): string {
    const icons = {
      success: '✅',
      error: '❌',
      info: 'ℹ️',
      warning: '⚠️'
    };
    return icons[type as keyof typeof icons] || 'ℹ️';
  }

  getClass(type: string): string {
    const classes = {
      success: 'notification-success',
      error: 'notification-error',
      info: 'notification-info',
      warning: 'notification-warning'
    };
    return classes[type as keyof typeof classes] || 'notification-info';
  }
}