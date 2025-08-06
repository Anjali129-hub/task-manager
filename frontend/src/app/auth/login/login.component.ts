import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule,  RouterModule  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  contact = ''; // Can be email or phone
  password = '';
  errorMessage: string | null = null;
  loading = false;
email: any;

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.errorMessage = null;
    this.loading = true;

    const loginUrl = 'http://127.0.0.1:8000/api/token/';

    this.http.post<{ access: string; refresh: string }>(loginUrl, {
      username: this.contact.trim(),
      password: this.password
    }).subscribe({
      next: (response) => {
        localStorage.setItem('access', response.access);
        localStorage.setItem('refresh', response.refresh);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.errorMessage = 'Invalid email/phone or password';
        console.error('Login error:', error);
      },
      complete: () => this.loading = false
    });
  }
}
