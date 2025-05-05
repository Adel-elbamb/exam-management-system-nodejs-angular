import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExamService } from '../../../services/exam.service';
import { Exam } from '../../../models/exam.model';

@Component({
  selector: 'app-take-exam',
  standalone: true,
  imports: [CommonModule, FormsModule], // <-- الحل هنا
  templateUrl: './take-exam.component.html',
  styleUrls: ['./take-exam.component.css']
})
export class TakeExamComponent implements OnInit {
  exam: Exam | null = null;
  selectedAnswers: number[] = [];
  examId: string = '';

  constructor(
    private route: ActivatedRoute,
    private examService: ExamService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.examId = this.route.snapshot.paramMap.get('id') || '';
    this.examService.getExamById(this.examId).subscribe({
      next: (examData) => {
        this.exam = examData;
        this.selectedAnswers = new Array(this.exam?.questions?.length || 0).fill(-1);

      },
      error: (err) => {
        console.error('Failed to load exam', err);
        this.exam = null;
      }
    });
  }

  onSubmit(): void {
    if (!this.exam) return;

    if (this.selectedAnswers.includes(-1)) {
      alert('Please answer all questions before submitting.');
      return;
    }

    this.examService.submitExam(this.examId, this.selectedAnswers).subscribe({
      next: (response) => {
        alert(`Your score: ${response.result.score}/${response.result.total}`);
        this.router.navigate(['/exam-list']);
      },
      error: (err) => {
        console.error('Error submitting exam:', err);
        alert('Something went wrong while submitting your exam.');
      }
    });
  }
}
