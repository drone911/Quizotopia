import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  @Input() quizStats: { totalQuizes: number, answeredCorrectly: number, difficult: string};
  message: string;
  percent: number;
  container: HTMLElement;
  constructor() { }

  ngOnInit() {
    this.percent = Math.round(this.quizStats.answeredCorrectly / this.quizStats.totalQuizes * 100);
    this.container = document.getElementsByClassName('all')[0] as HTMLElement;
    if (this.percent >= 50) {
      this.message = 'Congratulations!';
      this.container.style.backgroundColor = '#3fd059';
    } else {
      this.message = 'Could do Better! Try again';
      this.container.style.backgroundColor = 'red';
    }
  }
}
