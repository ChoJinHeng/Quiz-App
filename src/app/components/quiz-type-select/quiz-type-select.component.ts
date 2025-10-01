import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IonSelect, IonSelectOption } from '@ionic/angular/standalone';

@Component({
  selector: 'app-quiz-type-select',
  templateUrl: './quiz-type-select.component.html',
  styleUrls: ['./quiz-type-select.component.scss'],
  imports: [IonSelect, IonSelectOption],
})
export class QuizTypeSelectComponent implements OnInit {
  @Input() dynamicSelectData: any[] = [];
  @Output() quizTypeSelected = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  onTypeChange(event: any) {
    this.quizTypeSelected.emit(event.detail.value);
  }
}
