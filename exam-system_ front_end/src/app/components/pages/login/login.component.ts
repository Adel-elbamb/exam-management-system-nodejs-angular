import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize, of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink] 
})
export class LoginComponent {
  loginData = { username: '', password: '' };
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private router: Router, private http: HttpClient) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      this.http.post('/api/auth/login', this.loginData)
        .pipe(
          catchError((error) => {
            this.errorMessage = error.error?.message || 'Login failed. Please check your credentials.';
            return of(null);
          }),
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe((response: any) => {
          if (response) {
            this.successMessage = 'Login successful! Redirecting...';
            setTimeout(() => {
              this.router.navigate(['/exam-list']);
            }, 1500);
          }
        });
    } else {
      this.errorMessage = 'Please ensure all required fields are filled.';
      Object.values(form.controls).forEach(control => control.markAsTouched());
    }
  }
}
