import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuizCorrectAnswerSelectComponent } from './quiz-correct-answer-select.component';

describe('QuizCorrectAnswerSelectComponent', () => {
  let component: QuizCorrectAnswerSelectComponent;
  let fixture: ComponentFixture<QuizCorrectAnswerSelectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizCorrectAnswerSelectComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuizCorrectAnswerSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
