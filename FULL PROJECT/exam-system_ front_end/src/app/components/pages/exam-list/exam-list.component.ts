import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ExamService } from '../../../services/exam.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.css'],
  standalone: true,
  imports: [RouterLink, NgFor, NgIf],
})
export class ExamListComponent implements OnInit {
  exams: any[] = [];
  isLoading: boolean = true;

  constructor(private examService: ExamService) {}

  ngOnInit(): void {
    this.examService.getExams().subscribe({
      next: (data) => {
        this.exams = data.exams; 
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching exams:', err);
        this.isLoading = false;
      },
    });
  }
}
