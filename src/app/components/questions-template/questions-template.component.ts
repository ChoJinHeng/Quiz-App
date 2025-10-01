import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { QuestionsAnswersTemplateComponent } from '../questions-answers-template/questions-answers-template.component';

@Component({
  selector: 'app-questions-template',
  imports: [QuestionsAnswersTemplateComponent],
  templateUrl: './questions-template.component.html',
  styleUrls: ['./questions-template.component.scss'],
})
export class QuestionsOptionsTemplateComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  questionSelected = false;
  hideQuestionsOptions = true;

  @Output() buttonClicked = new EventEmitter<void>();
  onButtonClick() {
    this.buttonClicked.emit();
  }

  toggleQuestion() {
    this.questionSelected = !this.questionSelected;
    this.hideQuestionsOptions = !this.hideQuestionsOptions;
  }
}
