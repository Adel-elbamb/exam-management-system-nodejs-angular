
import { Injectable } from '@angular/core';

interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface Question {
  id: string;
  text: string;
  options: Option[];
}

interface NewQuestion {
  id: string;
  text: string;
  options: Option[];
}

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private questions: Question[] = [];  
  getQuestions(): Question[] {
    return this.questions;
  }

  getQuestion(index: number): Question {
    return this.questions[index];
  }

  addQuestion(newQuestion: NewQuestion): void {
    const questionToAdd: Question = {
      ...newQuestion,
      id: `q${this.questions.length + 1}`, 
       options: newQuestion.options.map(option => ({
        ...option,
        id: `o${Math.random().toString(36).substring(7)}`
    }))
    };
    this.questions.push(questionToAdd);
  }

  updateQuestion(index: number, updatedQuestion: NewQuestion): void {
    this.questions[index] = {
      ...updatedQuestion,
      id: this.questions[index].id, 
      options: updatedQuestion.options.map(option => ({
        ...option,
         id: option.id || `o${Math.random().toString(36).substring(7)}`
    }))
    };
  }

  deleteQuestion(index: number): void {
    this.questions.splice(index, 1);
  }
}