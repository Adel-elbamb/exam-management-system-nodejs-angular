
import { Component, OnInit } from '@angular/core';
import { Question, Option } from '../../../../models/question.model'; 
import { QuestionService } from '../../../../services/question.service'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';


interface NewQuestion {
  id: string;
  text: string;
  options: Option[];
}

@Component({
  selector: 'app-manage-questions',
  templateUrl: './manage-questions.component.html',
  styleUrls: ['./manage-questions.component.css'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgFor, NgIf]
})
export class ManageQuestionsComponent implements OnInit {
  questions: Question[] = [];
  newQuestion: NewQuestion = { id: '', text: '', options: [] };
  showModal = false;
  editingIndex = -1;

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.questions = this.questionService.getQuestions();
  }

  addQuestion() {
    this.newQuestion = { id: '', text: '', options: [] };
    this.editingIndex = -1;
    this.showModal = true;
  }

  editQuestion(index: number) {
    this.newQuestion = { ...this.questions[index] };
    this.editingIndex = index;
    this.showModal = true;
  }

  saveQuestion() {
    if (this.editingIndex === -1) {
      this.questionService.addQuestion(this.newQuestion);
    } else {
      this.questionService.updateQuestion(this.editingIndex, this.newQuestion);
    }
    this.questions = this.questionService.getQuestions(); 
    this.showModal = false;
  }

  deleteQuestion(index: number) {
    this.questionService.deleteQuestion(index);
    this.questions = this.questionService.getQuestions(); 
  }

  cancel() {
    this.showModal = false;
  }

  addOption() {
    this.newQuestion.options.push({ id: '', text: '', isCorrect: false });
  }
}
