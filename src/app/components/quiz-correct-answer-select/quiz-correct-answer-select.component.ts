import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quiz-correct-answer-select',
  templateUrl: './quiz-correct-answer-select.component.html',
  styleUrls: ['./quiz-correct-answer-select.component.scss'],
  standalone: true,
  imports: [IonSelect, IonSelectOption, FormsModule], // 👈 add FormsModule
})
export class QuizCorrectAnswerSelectComponent {
  @Input() answers: string[] = [];
  @Input() selectedIndex: number | null = null;
  @Output() answerSelected = new EventEmitter<number>();
}
