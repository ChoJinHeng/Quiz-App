import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IonSelect, IonSelectOption } from '@ionic/angular/standalone';

@Component({
  selector: 'app-quiz-timer',
  templateUrl: './quiz-timer.component.html',
  styleUrls: ['./quiz-timer.component.scss'],
  standalone: true,
  imports: [IonSelect, IonSelectOption],
})
export class QuizTimerComponent implements OnInit {
  @Input() timer: number | null = null; // current value from parent
  @Output() timerSelected = new EventEmitter<number>(); // emit changes

  constructor() {}

  ngOnInit() {}

  timerOptions = [
    { id: 1, time: 10 },
    { id: 2, time: 20 },
    { id: 3, time: 30 },
    { id: 4, time: 40 },
    { id: 5, time: 50 },
    { id: 6, time: 60 },
    { id: 7, time: 70 },
    { id: 8, time: 80 },
    { id: 9, time: 90 },
    { id: 10, time: 100 },
    { id: 11, time: 110 },
    { id: 12, time: 120 },
  ];
}
