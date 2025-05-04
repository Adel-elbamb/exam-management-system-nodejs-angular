import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,  
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
 
  user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    imageUrl: 'path-to-image.jpg'  
  };
}
