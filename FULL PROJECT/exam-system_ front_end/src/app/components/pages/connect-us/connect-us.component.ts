import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true, 
  selector: 'app-connect-us',
  templateUrl: './connect-us.component.html',
  styleUrls: ['./connect-us.component.css'],
  imports: [CommonModule, FormsModule] 
})
export class ConnectUsComponent {
  contact = {
    name: '',
    email: '',
    message: ''
  };

  submitted = false;

  sendMessage() {
    console.log('Contact message submitted:', this.contact);
    this.submitted = true;
   
  }
}
