// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import dayGridPlugin from '@fullcalendar/daygrid';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, HttpClientModule],
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.css'],
   providers: [AuthService],
})
export class AppComponent {
  title = 'task-manager';

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
export class FullCalendarComponent {
  calendarPlugins = [dayGridPlugin];  // add plugin here
}