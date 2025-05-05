import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private apiUrl = 'http://localhost:3000/api/exam';  

  constructor(private http: HttpClient) {}

  // إضافة سؤال جديد
  addQuestion(examId: string, questionData: any): Observable<any> {
    const token = localStorage.getItem('token');  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);  // إضافة التوكن في الهيدر

    return this.http.post<any>(`${this.apiUrl}/questions/${examId}`, questionData, { headers });
  }

  // تحديث السؤال
  updateQuestion(questionId: string, questionData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put<any>(`${this.apiUrl}/question/${questionId}`, questionData, { headers });
  }

  // حذف سؤال
  deleteQuestion(questionId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete<any>(`${this.apiUrl}/question/${questionId}`, { headers });
  }
}
