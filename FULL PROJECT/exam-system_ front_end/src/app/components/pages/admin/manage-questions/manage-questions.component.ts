import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { catchError, finalize, of } from 'rxjs';

@Component({
  selector: 'app-manage-questions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-questions.component.html',
  styleUrls: ['./manage-questions.component.css']
})
export class ManageQuestionsComponent implements OnInit {
  examId = ' examId'; 
  newQuestion = { text: '', options: [{ text: '', isCorrect: false }, { text: '', isCorrect: false }, { text: '', isCorrect: false }, { text: '', isCorrect: false }] };
  questions: any[] = [];
  errorMessage = '';
  successMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getQuestions();
  }

  // جلب الأسئلة من الـ backend
  getQuestions() {
    this.http.get<any[]>(`http://localhost:3000/api/exam/${this.examId}/questions`).subscribe(
      (response) => {
        this.questions = response; 
      },
      (error) => {
        this.errorMessage = 'Error fetching questions.';
      }
    );
  }

  // إضافة سؤال جديد
  addQuestion(form: NgForm) {
    if (form.valid) {
      this.http.post<any>(`http://localhost:3000/api/exam/${this.examId}/question`, this.newQuestion).subscribe(
        (response) => {
          this.successMessage = 'Question added successfully!';
          this.getQuestions();  
          form.reset();
        },
        (error) => {
          this.errorMessage = 'Error adding question.';
        }
      );
    }
  }

  // حذف سؤال
  deleteQuestion(questionId: string) {
    this.http.delete<any>(`http://localhost:3000/api/exam/${this.examId}/question/${questionId}`).subscribe(
      (response) => {
        this.successMessage = 'Question deleted successfully!';
        this.getQuestions();  // إعادة تحميل الأسئلة بعد الحذف
      },
      (error) => {
        this.errorMessage = 'Error deleting question.';
      }
    );
  }

  // تحديث سؤال
  updateQuestion(questionId: string) {
    this.http.put<any>(`http://localhost:3000/api/exam/${this.examId}/question/${questionId}`, this.newQuestion).subscribe(
      (response) => {
        this.successMessage = 'Question updated successfully!';
        this.getQuestions();  
      },
      (error) => {
        this.errorMessage = 'Error updating question.';
      }
    );
  }

  // إضافة خيار جديد
  addOption() {
    this.newQuestion.options.push({ text: '', isCorrect: false });
  }
}
