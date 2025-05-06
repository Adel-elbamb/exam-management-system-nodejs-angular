import { Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { ExamListComponent } from './components/pages/exam-list/exam-list.component';
import { TakeExamComponent } from './components/pages/take-exam/take-exam.component';
import { ViewStudentResultsComponent } from './components/pages/view-results/view-results.component';
import { ManageQuestionsComponent } from './components/pages/admin/manage-questions/manage-questions.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ConnectUsComponent } from './components/pages/connect-us/connect-us.component';

// AdminGuard
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'connect-us', component: ConnectUsComponent },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'exam-list', component: ExamListComponent },
  { path: 'take-exam/:id', component: TakeExamComponent },

  // Results 
  { path: 'view-results', component: ViewStudentResultsComponent },

  // Admin Routes with Guards
  {
    path: 'admin/manage-questions',
    component: ManageQuestionsComponent,
    canActivate: [AdminGuard], // Ensure only admins can access this route
  },
  {
    path: 'admin/view-student-results',
    component: ViewStudentResultsComponent,
    canActivate: [AdminGuard], // Ensure only admins can access this route
  },

  // Fallback Route
  { path: '**', redirectTo: '' },
];
