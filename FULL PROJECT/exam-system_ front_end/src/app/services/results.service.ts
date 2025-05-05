
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Results } from '../models/results.model'; 

@Injectable({
  providedIn: 'root',
})
export class ResultsService {

  constructor(private http: HttpClient) {}

  getStudentResults(): Observable<Results[]> {
  
    return this.http.get<Results[]>('http://localhost:3000/api/results');
  }
}
