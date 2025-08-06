import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class AddTaskComponent implements OnInit {
  taskForm!: FormGroup;
  errorMessage: string | null = null;
  users: any[] = [];
  currentUser: any;
  isManager: boolean = false;
  isLoading: boolean | undefined;

  constructor(
    private taskService: TaskService,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // Redirect if not logged in
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }

    // Get current user
    const user = this.authService.getCurrentUser();
    this.currentUser = user;
    this.isManager = user?.is_manager ?? false;

    // Initialize task form
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      deadline: ['', Validators.required],
      priority: ['Low'],
      assigned_to: [
        { value: null, disabled: !this.isManager },
        this.isManager ? Validators.required : []
      ]
    });

    // If manager, fetch employees to assign tasks
    if (this.isManager) {
      const token = this.authService.getToken();
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      this.http.get<any[]>('http://localhost:8000/api/users/employees/', { headers }).subscribe({
        next: (data) => {
          this.users = data;
        },
        error: (error) => {
          console.error('Failed to fetch users:', error);
        }
      });
    }
  }

createTask(): void {
  if (this.taskForm.invalid) {
    this.errorMessage = 'Please fill out all required fields.';
    return;
  }

  this.errorMessage = null;
  this.isLoading = true;

  const taskData = this.taskForm.getRawValue();

  this.taskService.createTask(taskData).subscribe({
    next: () => {
      alert('✅ Task created successfully!');
      this.taskForm.reset();
      this.isLoading = false;
      this.router.navigate(['/task-list']);
    },
    error: (err) => {
      console.error('Task creation failed:', err);
      this.errorMessage = err.error?.message || 'Failed to create task. Please try again.';
      this.isLoading = false;
    }
  });
}

}
