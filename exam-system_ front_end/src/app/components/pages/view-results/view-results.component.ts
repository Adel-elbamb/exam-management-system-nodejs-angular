import { Component, OnInit } from '@angular/core';
import { Results } from '../../../models/results.model';
import { ResultsService } from '../../../services/results.service';


import { NgFor, NgIf, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-student-results',
  templateUrl: './view-results.component.html',
  styleUrls: ['./view-results.component.css'],
  standalone: true,
  
  imports: [NgFor, NgIf, NgClass, FormsModule]
})
export class ViewStudentResultsComponent implements OnInit {
  studentResults: Results[] = [];
  selectedFilter: string = '';

  constructor(private resultsService: ResultsService) {}

  ngOnInit(): void {
    this.studentResults = this.resultsService.getStudentResults();
  }

  get filteredResults(): Results[] {
    return this.selectedFilter
      ? this.studentResults.filter(result => result.status === this.selectedFilter)
      : this.studentResults;
  }
}
