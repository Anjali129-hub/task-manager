import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, Observable, switchMap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

// Define User interface
export interface User {
  id?: number;
  username?: string;
  email?: string;
  is_manager?: boolean;
  full_name?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';
  private jwtHelper = new JwtHelperService();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}

  // ✅ Get token
  getToken(): string | null {
    return isPlatformBrowser(this.platformId) ? localStorage.getItem('access') : null;
  }

  // 🔐 LOGIN
login(username: string, password: string): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/token/`, { username, password }).pipe(
    map(response => {
      if (isPlatformBrowser(this.platformId)) {
        // ✅ Save access & refresh tokens
        localStorage.setItem('access', response.access);
        localStorage.setItem('refresh', response.refresh);

        // ✅ Save user info from response
        if (response.user) {
          localStorage.setItem('user', JSON.stringify(response.user));
        }
      }

      return {
        access: response.access,
        token: response.access,
        user: response.user
      };
    })
  );
}

  // 🟢 Check if token is valid
  get isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('access');
      if (!token || token.split('.').length !== 3) return false;
      try {
        return !this.jwtHelper.isTokenExpired(token);
      } catch {
        return false;
      }
    }
    return false;
  }

  // 👤 Get user from localStorage
  getCurrentUser(): User | null {
    if (isPlatformBrowser(this.platformId)) {
      const userStr = localStorage.getItem('user');
      try {
        return userStr ? JSON.parse(userStr) : null;
      } catch {
        return null;
      }
    }
    return null;
  }

  // 🔍 Get role (optional fallback via token)
  getRole(): string {
    const user = this.getCurrentUser();
    return user?.is_manager ? 'manager' : 'employee';
  }

  // 🔍 Get username
  getUsername(): string {
    return this.getCurrentUser()?.username || '';
  }

  // 🚪 Logout
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      localStorage.removeItem('user');
    }
    this.router.navigate(['/login']);
  }
}
