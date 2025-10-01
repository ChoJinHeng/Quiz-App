import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IonSelect, IonSelectOption } from '@ionic/angular/standalone';

@Component({
  selector: 'app-quiz-sequence-select',
  templateUrl: './quiz-sequence-select.component.html',
  styleUrls: ['./quiz-sequence-select.component.scss'],
  imports: [IonSelect, IonSelectOption],
})
export class QuizSequenceSelectComponent implements OnInit {
  @Input() dynamicOrderData: any[] = [];
  @Input() currentSequence!: number | null; // 👈 to allow keeping own sequence visible
  @Output() sequenceSelected = new EventEmitter<number | null>();

  constructor() {}

  ngOnInit() {}

  get availableSequences(): number[] {
    const allIds = this.dynamicOrderData.map((q) => q.id);
    const usedSequences = this.dynamicOrderData
      .filter((q) => q.sequence != null)
      .map((q) => q.sequence);

    return allIds.filter(
      (id) => !usedSequences.includes(id) || id === this.currentSequence
    );
  }

  onSelectChange(event: any) {
    this.sequenceSelected.emit(event.detail.value); // can be number or null
  }
}
