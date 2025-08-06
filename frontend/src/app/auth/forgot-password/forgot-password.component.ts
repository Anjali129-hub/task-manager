import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string = '';
  message: string = '';
  error: string = '';
  success: string = '';
  loading: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    if (!this.email) {
      this.error = 'Please enter your email.';
      return;
    }

    this.loading = true;
    this.success = '';
    this.error = '';

    this.http.post('http://localhost:8000/api/auth/forgot-password/', {
      email: this.email
    }).subscribe({
      next: (res: any) => {
        this.success = 'Reset link sent successfully to your email!';
        this.message = '';
      },
      error: (err) => {
        this.error = err?.error?.message || 'Failed to send reset link.';
        console.error(err);
        this.success = '';
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
