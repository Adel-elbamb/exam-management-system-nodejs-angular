import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Exam } from '../../../models/exam.model';
import { Question } from '../../../models/question.model'; 
import { ExamService } from '../../../services/exam.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-take-exam',
  templateUrl: './take-exam.component.html',
  styleUrls: ['./take-exam.component.css'],
  standalone: true,
  imports: [FormsModule, NgFor, NgIf]
})
export class TakeExamComponent implements OnInit {
  exam: Exam | null = null;
  selectedAnswers: { [key: number]: string } = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private examService: ExamService
  ) {}

  ngOnInit(): void {
    const examId = this.route.snapshot.paramMap.get('id');
    if (examId) {
      this.exam = this.examService.getExamById(examId);
      if (this.exam && this.exam.questions) {
        this.exam.questions.forEach((q: Question, index: number) => {
          this.selectedAnswers[index] = ''; 
        });
      }
    }
  }

  onSubmit(): void {
   
    console.log('Selected Answers:', this.selectedAnswers);
   
    this.router.navigate(['/view-results']);
  }
}
