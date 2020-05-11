import { Component, OnInit, Input, Output, ViewChild } from '@angular/core';
import { Quiz } from 'src/app/sevices/quiz.model';
import { EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  @Input() quiz: Quiz;
  @Input() status: { currentQuiz: number, totalQuiz: number};
  @ViewChild('answerForm', { static: true }) answerForm: NgForm;
  @Output() nextQuiz = new EventEmitter<{correct: boolean}>();
  timer: number;
  interval;
  container: HTMLElement;
  constructor() {}

  ngOnInit() {
    this.autoChange();
    this.container = document.getElementsByClassName('container')[0] as HTMLElement;
    this.container.style.animation = `backgroundColorToRed ${this.quiz.timeOut }s ease-in`;
}
  onNextQuiz() {
    const answer: number = Number(this.answerForm.value.option);
    if (answer === 0) {
      const labels = this.container.getElementsByTagName('label');
      this.shake(labels);
    } else {
        this.answerForm.resetForm();
        // do animations
        this.nextQuiz.emit({ correct: this.quiz.answer === answer});
        setTimeout(() => {
          clearInterval(this.interval);
          this.autoChange();
          this.container.style.animation = '';
          setTimeout(() => {
            this.container.style.animation = `backgroundColorToRed ${this.quiz.timeOut }s ease-in`;
          }, 1000);
        }, 500);
    }
  }
  autoChange() {
    this.timer = this.quiz.timeOut;
    this.interval = setInterval(() => {
      if (this.timer > 0 ) {
        this.timer = this.timer - 1;
      } else {
        clearInterval(this.interval);
        this.answerForm.value.option = 5;
        this.onNextQuiz();
      }
    }, 1000);
  }
  async shake(labels: HTMLCollectionOf<HTMLLabelElement>) {
    console.log('shake');
    // tslint:disable-next-line: prefer-for-of
    for ( let i = 0; i < labels.length; i++) {
      labels[i].style.animation = 'shake 0.3s linear';
    }
    setTimeout(() => {
      // tslint:disable-next-line: prefer-for-of
      for ( let i = 0; i < labels.length; i++) {
        labels[i].style.animation = '';
      }
    }, 300);
  }
}
