import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean =
    localStorage.getItem('isLoggedIn') === 'true' ? true : false;
  // store the URL so we can redirect after logging in
  redirectUrl: string; ƒ;
  constructor(protected router: Router) {}
  login(data) {
    localStorage.setItem('admin_id', data.admin_id);
    localStorage.setItem('admin_token', data.admin_token);
    localStorage.setItem('isLoggedIn', 'true');
    this.isLoggedIn = true;
  }

  logout(): void {
    localStorage.removeItem('admin_id');
    localStorage.removeItem('admin_token');
    localStorage.setItem('isLoggedIn', 'false');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
