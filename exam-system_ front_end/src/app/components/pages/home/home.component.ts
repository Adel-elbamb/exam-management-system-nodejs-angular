import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // استيراد RouterModule

@Component({
  selector: 'app-home',
  standalone: true,  // تأكدي أنه مكون standalone
  imports: [RouterModule], // إضافة RouterModule هنا
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {}
