import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';

interface Task {
  id: number;
  title: string;
  description?: string;
  deadline?: string;
  status?: string;
  priority?: string;
  completed: boolean;
  due_date: string;
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FullCalendarModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  today: Date = new Date();

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    events: [],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    height: 'auto'
  };
  authService: any;

  constructor(private http: HttpClient) {}

ngOnInit(): void {
  const token = localStorage.getItem('access');
if (!token) {
  console.error('No access token found');
  // redirect to login or handle error
  return;
}

const headers = new HttpHeaders({
  'Authorization': `Bearer ${token}`
});

this.http.get<Task[]>('http://127.0.0.1:8000/api/tasks/', { headers }).subscribe({
  next: (tasks) => {
    // handle tasks
  },
  error: (err) => {
    console.error('Failed to fetch tasks:', err);
    if (err.status === 401) {
      // token invalid or expired, logout or redirect to login
      this.authService.logout(); 
    }
  }
});

}

}