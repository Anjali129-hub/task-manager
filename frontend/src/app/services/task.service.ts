import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service'; // ✅ Import this

export interface Task {
  id: number;
  title: string;
  description: string;
  deadline: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  priority: 'Low' | 'Medium' | 'High';
  created_by: number;
  assigned_to: number | null;
  assigned_to_username?: string;
  created_at: string;
  updatingStatus?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private baseUrl = 'http://127.0.0.1:8000/api/tasks/';

  constructor(
    private http: HttpClient,
    private authService: AuthService // ✅ Injected here
  ) {}

  private getJsonHeaders(): HttpHeaders {
    const token = localStorage.getItem('access');
    const headersConfig: any = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headersConfig['Authorization'] = `Bearer ${token}`;
    }

    return new HttpHeaders(headersConfig);
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl, {
      headers: this.getJsonHeaders(),
    });
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(
      'http://127.0.0.1:8000/api/users/employees/',
      {
        headers: this.getJsonHeaders(),
      }
    );
  }

  createTask(taskData: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
    return this.http.post('http://localhost:8000/api/tasks/', taskData, { headers });
  }

  updateTask(id: number, taskData: Partial<Task>): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}${id}/`, taskData, {
      headers: this.getJsonHeaders(),
    });
  }

  updateTaskStatus(id: number, status: string): Observable<Task> {
    return this.http.patch<Task>(
      `${this.baseUrl}${id}/`,
      { status },
      {
        headers: this.getJsonHeaders(),
      }
    );
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}${id}/`, {
      headers: this.getJsonHeaders(),
    });
  }
}
