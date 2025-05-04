import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [RouterLink, CommonModule]
})
export class NavbarComponent {
  constructor(private router: Router) {}

  isLoggedIn(): boolean {
    
    return !!localStorage.getItem('user');/*********@@@@@ */
  }

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
