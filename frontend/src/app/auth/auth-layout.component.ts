import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="auth-wrapper">
      <div class="auth-box">
        <div class="auth-header">
          <h1>Task Manager</h1>
          <p class="subtitle">Manage tasks efficiently</p>
        </div>
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .auth-wrapper {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(to right, #e0eafc, #cfdef3);
      padding: 1rem;
    }

    .auth-box {
      width: 100%;
      max-width: 500px;
      background: #fff;
      border-radius: 16px;
      padding: 2.5rem;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    }

    .auth-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .auth-header h1 {
      font-size: 2rem;
      color: #2c3e50;
      margin-bottom: 0.5rem;
    }

    .subtitle {
      font-size: 1rem;
      color: #7f8c8d;
    }

    @media (max-width: 600px) {
      .auth-box {
        padding: 1.5rem;
      }

      .auth-header h1 {
        font-size: 1.5rem;
      }
    }
  `]
})
export class AuthLayoutComponent {}
