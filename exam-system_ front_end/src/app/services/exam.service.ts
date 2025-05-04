
import { Injectable } from '@angular/core';
import { Exam } from '../models/exam.model';
import { Question, Option } from '../models/question.model';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  private exams: Exam[] = [
    {
      id: '1',
      name: 'Quiz 1',
      description: 'This is the first quiz.',
      questions: [
        {
          id: 'q1',
          text: 'What is the capital of France?',
          options: [
            { id: 'o1', text: 'London', isCorrect: false },
            { id: 'o2', text: 'Paris', isCorrect: true },
            { id: 'o3', text: 'Berlin', isCorrect: false },
          ],
        },
        {
          id: 'q2',
          text: 'What is 2 + 2?',
          options: [
            { id: 'o4', text: '3', isCorrect: false },
            { id: 'o5', text: '4', isCorrect: true },
            { id: 'o6', text: '5', isCorrect: false },
          ],
        },
      ],
    },
    {
      id: '2',
      name: 'Quiz 2',
       description: 'This is the second quiz',
      questions: [
        {
          id: 'q3',
          text: 'What is the largest planet?',
          options: [
            { id: 'o7', text: 'Mars', isCorrect: false },
            { id: 'o8', text: 'Jupiter', isCorrect: true },
            { id: 'o9', text: 'Earth', isCorrect: false },
          ],
        },
      ],
    },
  ];

  getExams(): Exam[] {
    return this.exams;
  }

  getExamById(id: string): Exam | null {
    return this.exams.find((exam) => exam.id === id) || null;
  }
}