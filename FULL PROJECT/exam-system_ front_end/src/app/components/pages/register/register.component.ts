import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink]
})
export class RegisterComponent {
  registerData = {
    firstName: '',
    lastName: '',
    userName: '',  
    email: '',
    mobileNumber: '',
    password: ''
  };

  errorMessage = '';
  successMessage = '';
  isLoading = false;

  constructor(private router: Router, private http: HttpClient) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      this.http.post<any>('http://localhost:3000/auth', this.registerData) // <-- المسار الصحيح هنا
        .pipe(
          catchError(error => {
            this.errorMessage = error.error?.message || 'Registration failed. Please try again.';
            return of(null);
          }),
          finalize(() => this.isLoading = false)
        )
        .subscribe(response => {
          if (response?.token) {
            localStorage.setItem('token', response.token);
            const decoded: any = jwtDecode(response.token);
            localStorage.setItem('userRole', decoded.role);
            localStorage.setItem('userId', decoded._id);

            this.successMessage = 'Registration successful! Redirecting...';
            setTimeout(() => this.router.navigate(['/exam-list']), 1500);
          }
        });
    } else {
      this.errorMessage = 'Please fill all required fields correctly.';
      Object.values(form.controls).forEach(control => control.markAsTouched());
    }
  }
}
