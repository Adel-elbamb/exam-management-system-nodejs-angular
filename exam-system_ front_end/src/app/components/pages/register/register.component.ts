import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize, of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink]  
})
export class RegisterComponent {
  registerData = { username: '', email: '', password: '' };
  errorMessage = '';
  successMessage = '';
  isLoading = false;

  constructor(private router: Router, private http: HttpClient) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      this.http.post('/api/auth/register', this.registerData)
        .pipe(
          catchError(error => {
            this.errorMessage = error.error?.message || 'Registration failed. Please try again.';
            return of(null);
          }),
          finalize(() => this.isLoading = false)
        )
        .subscribe(response => {
          if (response) {
            this.successMessage = 'Registration successful! Redirecting...';
            setTimeout(() => this.router.navigate(['/login']), 1500);
          }
        });
    } else {
      this.errorMessage = 'Please fill all required fields correctly.';
      Object.values(form.controls).forEach(control => control.markAsTouched());
    }
  }
}
