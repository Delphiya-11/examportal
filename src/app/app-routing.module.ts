import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ThanksComponent } from './thanks/thanks.component';
import { InstComponent } from './inst/inst.component';
import { ExamComponent } from './exam/exam.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: 'login',component:LoginComponent},
  {path: 'inst',component:InstComponent},
  {path: 'thanks',component: ThanksComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'exam',component: ExamComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[InstComponent, ThanksComponent, ExamComponent]
