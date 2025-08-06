import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TaskService, Task } from '../services/task.service';
import { AuthService } from '../auth/auth.service';
import { FormsModule } from '@angular/forms'; 
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  errorMessage: string | undefined;
selectedStatus: any;
statuses: any;

  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.authService.isLoggedIn) {
      this.loadTasks();
    } else {
      this.router.navigate(['/login']);
    }
  }
isLoading = false; // Add this line

loadTasks(): void {
  this.isLoading = true; // Start loading

  this.taskService.getTasks().subscribe({
    next: (tasks) => {
      this.tasks = tasks;
      this.isLoading = false; // Stop loading
    },
    error: (error) => {
      console.error('Error fetching tasks:', error);
      this.isLoading = false;
      if (error.status === 401) {
        alert('Session expired. Please login again.');
        this.router.navigate(['/login']);
      } else {
        this.errorMessage = 'Failed to load tasks. Please try again later.';
      }
    }
  });
}

  updateStatus(task: Task, newStatus: Task["status"]): void {
    const oldStatus = task.status;
    task.status = newStatus;

    this.taskService.updateTaskStatus(task.id, newStatus).subscribe({
      next: () => console.log(`Task ${task.id} status updated to ${newStatus}`),
      error: () => {
        task.status = oldStatus;
        this.errorMessage = 'Failed to update task status. Please try again.';
      }
    });
  }

  onStatusChange(event: Event, task: Task): void {
    const target = event.target as HTMLSelectElement;
    this.updateStatus(task, target.value as Task["status"]);
  }

  deleteTask(task: Task): void {
    if (confirm(`Are you sure you want to delete task "${task.title}"?`)) {
      this.taskService.deleteTask(task.id).subscribe({
        next: () => {
          this.tasks = this.tasks.filter(t => t.id !== task.id);
        },
        error: () => {
          this.errorMessage = 'Failed to delete task. Please try again.';
        }
      });
    }
  }

  navigateToAddTask(): void {
    this.router.navigate(['/add-task']);
  }
}
