
import { Injectable } from '@angular/core';
    import { Results } from '../models/results.model';

    @Injectable({
      providedIn: 'root',
    })
    export class ResultsService {
      //this data would come from the backend FROM ADEL
      private results: Results = {
        examName: 'Sample Exam',
        score: 8,
        totalQuestions: 10,
        percentage: 80,
        status: 'Passed',
      };

      private studentResults: Results[] = [
        {
          examName: 'Exam 1',
          score: 7,
          totalQuestions: 10,
          percentage: 70,
          status: 'Passed',
          studentName: 'AHMAD',
        },
        {
          examName: 'Exam 1',
          score: 5,
          totalQuestions: 10,
          percentage: 50,
          status: 'Failed',
          studentName: 'ALAA',
        },
        {
          examName: 'Exam 2',
          score: 9,
          totalQuestions: 10,
          percentage: 90,
          status: 'Passed',
          studentName: 'ADEL',
        },
      ];

      getResults(): Results {
        return this.results;
      }

      getStudentResults(): Results[] {
        return this.studentResults;
      }
    }