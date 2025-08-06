import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

interface User {
  id: number;
  username: string;
  is_manager: boolean;
}

@Injectable({ providedIn: 'root' })
export class ManagerGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = this.auth.isLoggedIn;
    const user = this.auth.getCurrentUser(); // should return User | null

    if (isLoggedIn && user && user.is_manager) {
      return true;
    }

    // Not authorized: redirect to dashboard
    this.router.navigate(['/dashboard']);
    return false;
  }
}
