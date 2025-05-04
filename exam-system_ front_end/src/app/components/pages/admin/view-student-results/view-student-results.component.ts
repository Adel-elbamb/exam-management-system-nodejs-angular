import { Component, OnInit } from '@angular/core';
import { Results } from '../../../../models/results.model';
import { ResultsService } from '../../../../services/results.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-view-student-results',
  templateUrl: './view-student-results.component.html',
  styleUrls: ['./view-student-results.component.css'],
  standalone: true,
  imports: [NgFor, NgIf]
})
export class ViewStudentResultsComponent implements OnInit {
  studentResults: Results[] = [];

  constructor(private resultsService: ResultsService) {}

  ngOnInit(): void {
    this.studentResults = this.resultsService.getStudentResults();
  }
}
