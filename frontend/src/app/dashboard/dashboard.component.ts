import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AddTaskComponent } from "../add-task/add-task.component";
import { TaskListComponent } from "../task-list/task-list.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
[x: string]: any;
  username: string = '';
  role: string = '';
  isManager: boolean = false;
 
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    const token = localStorage.getItem('access');
    const storedUsername = localStorage.getItem('username');
    const userData = localStorage.getItem('user');

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.username = storedUsername || payload.username || 'User';

        if (userData) {
          const user = JSON.parse(userData);
          this.isManager = user.is_manager || false;
          this.role = user.is_manager ? 'manager' : 'employee';
        } else {
          this.role = payload.role || 'employee';
          this.isManager = this.role === 'manager';
        }

      } catch (error) {
        console.error('Failed to decode token:', error);
        this.username = storedUsername || 'User';
        this.role = 'employee';
        this.isManager = false;
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  confirmLogout(): void {
    if (confirm('Are you sure you want to logout?')) {
      this.logout();
    }
  }
}
