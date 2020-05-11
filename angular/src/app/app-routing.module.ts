import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizesComponent } from './quizes/quizes.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'quizes/:difficulty', component: QuizesComponent },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
