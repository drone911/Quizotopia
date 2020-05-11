import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms' 

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { QuizesComponent } from './quizes/quizes.component';
import { QuizComponent } from './quizes/quiz/quiz.component';
import { QuizService } from './sevices/quiz.service';
import { ResultComponent } from './quizes/result/result.component';
import { TimerPipe } from './quizes/quiz/timer.pipe';
import { SingleTitleCasePipe } from './quizes/singletitlecase.pipe';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    QuizesComponent,
    QuizComponent,
    ResultComponent,
    TimerPipe,
    SingleTitleCasePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [QuizService],
  bootstrap: [AppComponent]
})
export class AppModule { }
