
// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { NavbarComponent } from './components/navbar/navbar.component';  // Import
// import { FooterComponent } from './components/footer/footer.component'; // Import
// @Component({
// selector: 'app-root',
// standalone: true,
// imports: [RouterOutlet, NavbarComponent, FooterComponent], // Add
// templateUrl: './app.component.html',
// styleUrl: './app.component.css'
// })
// export class AppComponent {
// title = 'exam-system';
// }

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component'; // Import
import { FooterComponent } from './components/footer/footer.component'; // Import
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent], // Add
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent {
  title = 'exam-system';
}