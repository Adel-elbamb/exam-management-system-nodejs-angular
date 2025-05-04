import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Exam } from '../../../models/exam.model'; 
import { ExamService } from '../../../services/exam.service'; 
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.css'],
  standalone: true,
  imports: [RouterLink, NgFor, NgIf]
})
export class ExamListComponent implements OnInit {
  exams: Exam[] = [];

  constructor(private examService: ExamService) {}

  ngOnInit(): void {
    this.exams = this.examService.getExams();
  }
}