import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuestionsAnswersTemplateComponent } from './questions-answers-template.component';

describe('QuestionsAnswersTemplateComponent', () => {
  let component: QuestionsAnswersTemplateComponent;
  let fixture: ComponentFixture<QuestionsAnswersTemplateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsAnswersTemplateComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionsAnswersTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
