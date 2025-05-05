import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  private apiUrl = 'http://localhost:3000/api/exam';

  constructor(private http: HttpClient) {}

  
  getExams(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  
  getExamById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }


  submitExam(id: string, answers: number[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${id}`, { answers });
  }
}
