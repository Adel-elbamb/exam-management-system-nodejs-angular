import { Question } from './question.model';

export interface Exam {
  id: string;
  name: string;
  description: string;
  questions: Question[];
}
