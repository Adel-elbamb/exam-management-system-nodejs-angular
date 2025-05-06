import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink]
})
export class LoginComponent {
  loginData = { email: '', password: '' };  
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private router: Router, private http: HttpClient) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';
  
      this.http.post<any>('http://localhost:3000/auth/login', this.loginData)
        .pipe(
          catchError((error) => {
            this.errorMessage = error.error?.message || 'Login failed. Please check your credentials.';
            return of(null);
          }),
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe((response) => {
          if (response?.token) {  
            
            localStorage.setItem('token', response.token);
  
            const decoded: any = jwtDecode(response.token);  
            localStorage.setItem('userRole', decoded.role);  
            localStorage.setItem('userId', decoded._id);  
  
            this.successMessage = 'Login successful! Redirecting...';
  
            
            setTimeout(() => {
              if (decoded.role === 'Admin') {
                this.router.navigate(['/admin/manage-questions']);
              } else {
                this.router.navigate(['/exam-list']);
              }
            }, 1500);
          }
        });
    }
  }
  
  ngOnInit() {
    
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      // يمكنك التحقق من صلاحية التوكن هنا إذا أردت
      if (decoded.exp * 1000 < Date.now()) {
        // إذا انتهت صلاحية التوكن، قم بإزالته
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      }
    }
  }
}
