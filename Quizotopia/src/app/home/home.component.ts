import { Component, OnInit } from '@angular/core';
import {trigger, state, style, animate, transition } from '@angular/animations'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('showButtons', [
      state('hidden', style({
        transform: 'translateY(400%)',
        opacity: 0
      })),
      state('show', style({
        transform: 'translateY(70%)',
        opacity: 1
      })),
      transition('hidden => show', [
        animate('0.2s')
      ]),
      transition('show => hidden', [
        animate('0.2s')
      ])
    ]),
    trigger('displaceButton', [
      state('hidden', style({})),
      state('show', style({
        transform: 'translateY(-70%) scale(0.9)'
      })),
      transition('* => *', [
        animate('0.2s')
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  hiddenButtonState = 'hidden';
  constructor() { }

  ngOnInit() {
  }
  toggleHiddenButtons() {
    this.hiddenButtonState  = this.hiddenButtonState === 'hidden' ? 'show' : 'hidden';
  }
}
