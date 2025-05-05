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
  loginData = { email: '', password: '' };  // بيانات تسجيل الدخول
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private router: Router, private http: HttpClient) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';
  
      this.http.post<any>('http://localhost:3000/auth/login', this.loginData)  // إرسال بيانات تسجيل الدخول إلى الـ Backend
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
          if (response?.token) {  // إذا تم استلام التوكن
            localStorage.setItem('token', response.token);  // تخزين التوكن في localStorage

            const decoded: any = jwtDecode(response.token);  // فك تشفير التوكن للحصول على بيانات المستخدم
            localStorage.setItem('userRole', decoded.role);  // تخزين دور المستخدم
            localStorage.setItem('userId', decoded._id);  // تخزين ID المستخدم

            this.successMessage = 'Login successful! Redirecting...';  // رسالة نجاح تسجيل الدخول

            setTimeout(() => {
              if (decoded.role === 'Admin') {
                this.router.navigate(['/admin/manage-questions']);  // إذا كان المستخدم Admin يتم توجيههم إلى لوحة الإدارة
              } else {
                this.router.navigate(['/exam-list']);  // إذا كان المستخدم Student يتم توجيههم إلى صفحة الامتحانات
              }
            }, 1500);  // التوجيه بعد 1.5 ثانية
          }
        });
    } else {
      this.errorMessage = 'Please ensure all required fields are filled.';
      Object.values(form.controls).forEach(control => control.markAsTouched());  // التأكد من أن جميع الحقول تم تعبئتها
    }
  }
}
