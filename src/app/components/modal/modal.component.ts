import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonIcon,
  IonTitle,
  IonCard,
  IonToolbar,
  ModalController,
  ActionSheetController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, trash, alertCircle } from 'ionicons/icons';

// Custom Components
import { QuizTypeSelectComponent } from '../quiz-type-select/quiz-type-select.component';
import { QuizSequenceSelectComponent } from '../quiz-sequence-select/quiz-sequence-select.component';
import { QuizTimerComponent } from '../quiz-timer/quiz-timer.component';
import { QuizCorrectAnswerSelectComponent } from '../quiz-correct-answer-select/quiz-correct-answer-select.component';

// Services & Interfaces
import { QuizManagement } from 'src/app/services/quiz-management';
import { Quiz, QuizQuestion } from 'src/app/interfaces/quiz.interface';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonTitle,
    IonToolbar,
    IonIcon,
    IonCard,
    QuizTypeSelectComponent,
    QuizSequenceSelectComponent,
    QuizTimerComponent,
    QuizCorrectAnswerSelectComponent,
  ],
})
export class ModalComponent implements OnInit {
  // ===== State =====
  name!: string;
  presentingElement: HTMLElement | null = null;

  quizData: Quiz = {
    quizType: '',
    quizTopic: '',
    questions: [],
  };

  questions = signal<QuizQuestion[]>([
    {
      id: 1,
      type: this.quizData.quizType,
      title: '',
      answers: ['', ''],
      correctAnswers: [],
      sequence: null,
      timer: null,
    },
  ]);

  quizTypeSelect = [
    {
      dataType: 'Quiz Type',
      data: [
        { id: 1, quizType: 'Single Answer Quiz' },
        { id: 2, quizType: 'Multi Answer Quiz' },
        { id: 3, quizType: 'Mix Answer Quiz' },
      ],
    },
  ];

  // ===== Lifecycle =====
  constructor(
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private quizManagement: QuizManagement
  ) {
    addIcons({ add, trash, alertCircle });
  }

  ngOnInit(): void {
    this.presentingElement = document.querySelector('.ion-page');
    console.log(this.quizData);
    console.log(this.questions());
  }

  // ===== Quiz Updates =====
  updateQuizType(type: string) {
    this.quizData.quizType = type;
    this.questions.update((qs) => qs.map((q) => ({ ...q, type })));
    console.log('Quiz type updated:', this.quizData);
  }

  onTopicChange() {
    console.log('Quiz topic updated:', this.quizData.quizTopic);
  }

  updateSequence(questionId: number, sequence: number | null) {
    this.questions.update((qs) =>
      qs.map((q) => (q.id === questionId ? { ...q, sequence } : q))
    );
  }

  updateQuestion(question: QuizQuestion) {
    this.quizData.questions.push(question);
  }

  onTimerSelected(questionId: number, timerValue: number) {
    this.questions.update((qs) =>
      qs.map((q) => (q.id === questionId ? { ...q, timer: timerValue } : q))
    );
  }

  onCorrectAnswerSelected(questionId: number, selectedIndex: number) {
    this.questions.update((qs) =>
      qs.map((q) =>
        q.id === questionId ? { ...q, correctAnswers: [selectedIndex] } : q
      )
    );
  }

  // ===== Question Management =====
  addQuestion() {
    const newId = this.questions().length + 1;
    this.questions.update((qs) => [
      ...qs,
      {
        id: newId,
        type: this.quizData.quizType,
        title: '',
        answers: ['', ''],
        correctAnswers: [],
        sequence: null,
        timer: null,
      },
    ]);
    console.log(this.quizData);
  }

  deleteQuestion(id: number) {
    if (id === 1) return;
    this.questions.update((qs) => qs.filter((q) => q.id !== id));
  }

  addAnswer(questionId: number) {
    this.questions.update((qs) =>
      qs.map((q) =>
        q.id === questionId && q.answers.length < 6
          ? { ...q, answers: [...q.answers, ''] }
          : q
      )
    );
  }

  deleteAnswer(questionId: number, answerIndex: number) {
    this.questions.update((qs) =>
      qs.map((q) => {
        if (q.id === questionId) {
          if (q.answers.length <= 2) return q;
          return {
            ...q,
            answers: q.answers.filter((_, idx) => idx !== answerIndex),
          };
        }
        return q;
      })
    );
  }

  // ===== Modal Actions =====
  async cancel() {
    const canDismiss = await this.confirmDismiss();
    if (canDismiss) {
      return this.modalCtrl.dismiss(null, 'cancel');
    }
    return false;
  }

  async confirm() {
    const canDismiss = await this.confirmDismiss();
    if (canDismiss) {
      this.quizData.questions = this.questions();
      console.log(this.quizData);
      console.log(this.questions());

      this.quizManagement.createQuiz(this.quizData).subscribe({
        next: (response) => {
          console.log('Quiz created successfully', response);
          this.modalCtrl.dismiss(this.quizData, 'confirm');
        },
        error: (error) => {
          console.error('Error creating quiz', error);
          // Handle error (toast/alert)
        },
        complete: () => {
          console.log("Quiz Created Succesfully!");
        }
      });
    }
    return false;
  }

  private async confirmDismiss(): Promise<boolean> {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Are you sure?',
      buttons: [
        { text: 'Yes', role: 'confirm' },
        { text: 'No', role: 'cancel' },
      ],
    });

    await actionSheet.present();
    const { role } = await actionSheet.onWillDismiss();
    return role === 'confirm';
  }
}
