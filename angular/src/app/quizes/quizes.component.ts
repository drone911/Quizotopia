import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuizService } from '../sevices/quiz.service';
import { Quiz } from '../sevices/quiz.model';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-quizes',
  templateUrl: './quizes.component.html',
  styleUrls: ['./quizes.component.css'],
})
export class QuizesComponent implements OnInit, OnDestroy {
  quizNumber = 0;
  answeredCorrectly = 0;
  totalQuizes: number;
  quizes: Quiz[];
  difficulty: string;
  showResult: boolean;
  loaded: boolean;
  routeSubscription: Subscription;
  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService
  ) {}
  ngOnInit() {
    this.showResult = false;
    this.loaded = false;
    this.routeSubscription = this.route.params.subscribe((params: Params) => {
      this.startQuiz(params.difficulty);
    });
  }
  startQuiz(difficulty: string) {
    this.showResult = false;
    this.difficulty = difficulty;
    this.quizService
      .getQuiz(this.difficulty)
      .subscribe((res: any) => {
        if (res.success) {
          this.quizes = res.quizes.map((quiz) => new Quiz().desearialize(quiz));
          this.quizNumber = 0;
          this.answeredCorrectly = 0;
          this.totalQuizes = this.quizes.length;
          this.loaded = true;
        } else {
          // show error in toast
          console.log(res.message);
        }
      });
  }
  nextQuiz(prevQuizData: { correct: boolean }) {
    // trigger animations
    if (prevQuizData.correct) {
      this.answeredCorrectly += 1;
    }
    if (this.quizNumber === this.totalQuizes - 1) {
      this.endQuiz();
    }
    this.quizNumber += 1;
  }
  endQuiz() {
    this.showResult = true;
  }
  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }
}
