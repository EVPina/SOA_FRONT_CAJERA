import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Notification } from './components/notification/notification';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Notification],
  template: `
    <app-notification></app-notification>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'MozoApp';
}