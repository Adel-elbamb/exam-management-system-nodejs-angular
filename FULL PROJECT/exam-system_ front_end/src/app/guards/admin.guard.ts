import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const role = localStorage.getItem('userRole');

    if (role === 'Admin') {
      return true; 
    }
    
   this.router.navigate(['/exam-list']);
    return false;
  }
}
