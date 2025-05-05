import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuestionService } from '../../../../services/question.service';

@Component({
  selector: 'app-manage-questions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [QuestionService],
  templateUrl: './manage-questions.component.html',
  styleUrls: ['./manage-questions.component.css']
})
export class ManageQuestionsComponent {
  questions: any[] = [];
  showModal: boolean = false;
  newQuestion: any = { text: '', options: [] };
  successMessage: string = '';
  errorMessage: string = '';
  editingIndex: number = -1;
  examId: string = 'someExamId';  

  constructor(private questionService: QuestionService) {}

  addQuestion() {
    this.showModal = true;
    this.editingIndex = -1;  
    this.newQuestion = { text: '', options: [] };  
  }

  saveQuestion(form: any) {
    if (this.editingIndex === -1) {
      this.questionService.addQuestion(this.examId, this.newQuestion).subscribe(
        (response: any) => {
          this.successMessage = 'Question added successfully!';
          this.questions.push(response.question);
        },
        (error: any) => {
          this.errorMessage = 'Error adding question';
        }
      );
    } else {
      this.questionService.updateQuestion(this.newQuestion._id, this.newQuestion).subscribe(
        (response: any) => {
          this.successMessage = 'Question updated successfully!';
          this.questions[this.editingIndex] = response.question;
        },
        (error: any) => {
          this.errorMessage = 'Error updating question';
        }
      );
    }
  
    this.showModal = false;
    form.reset();
  }
  
  editQuestion(index: number) {
    this.editingIndex = index;
    this.newQuestion = { ...this.questions[index] };  
  }

  deleteQuestion(index: number) {
    this.questionService.deleteQuestion(this.questions[index]._id).subscribe(
      (response: any) => {
        this.questions.splice(index, 1);  
        this.successMessage = 'Question deleted successfully!';
      },
      (error: any) => {
        this.errorMessage = 'Error deleting question';
      }
    );
  }

  addOption() {
    this.newQuestion.options.push({ text: '', isCorrect: false });  // إضافة خيار جديد
  }

  deleteOption(index: number) {
    this.newQuestion.options.splice(index, 1); 
  }

  cancel() {
    this.showModal = false;  
  }
}
