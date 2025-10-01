import {
  Component,
  HostListener,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { App } from '@capacitor/app';
import { PluginListenerHandle } from '@capacitor/core';
import { Observable } from 'rxjs';
import { switchMap, map, take } from 'rxjs/operators';
import { CStopwatchTimerComponent } from 'src/app/components/c-stopwatch-timer/c-stopwatch-timer.component';
import { SrApiLevelService } from 'src/app/services/api/sr-api-level.service';
import { SrGameQuestionApiService } from 'src/app/services/sr-game-question-api.service';
import { IonCard, IonButton, IonCardContent } from '@ionic/angular/standalone';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.scss'],
  standalone: true,
  imports: [IonCardContent, IonCard, IonCardContent, IonButton, RouterLink],
})
export class QuestionPageComponent implements OnInit {
  levelId!: string;
  questionList: any[] = [];
  answerList: any[] = [];
  questionCurrent: number = 0;
  answerLabel: string[] = ['A', 'B', 'C', 'D'];
  clicked: boolean = false;
  modalView: number = 0;
  resultSent: boolean = false;

  // Add these for multi-level tracking
  currentLevel: number = 1;
  totalLevels: number = 3;
  totalCorrect: number = 0;
  allAnswers: any[] = [];

  private isNavigatingAway = false;

  constructor(
    private gQuestionService: SrGameQuestionApiService,
    private activatedRoute: ActivatedRoute,
    private alertCtrl: AlertController,
    private navCtrl: NavController // Add this
  ) {}

  ngOnInit() {
    // ngOnInit runs before ionViewWillEnter, so questionList is still empty here
    this.startLevel(1);
  }

  async ionViewWillEnter() {
    this.modalView = 0;
    this.resultSent = false;
    this.questionCurrent = 0;

    this.levelId = this.activatedRoute.snapshot.params['id'];

    console.log('Level ID:', this.levelId); // Check if levelId is correct

    this.gQuestionService
      .getData(this.levelId)
      .then((data) => {
        this.questionList = data;
        // this.stopwatch.startCountDown();
        console.log('Question list loaded:', this.questionList);
      })
      .catch((error) => {
        console.error('Error loading questions:', error);
      });
  }

  async startLevel(level: number) {
    this.currentLevel = level;
    this.questionCurrent = 0;
    this.answerList = [];
    this.levelId = String(level);
    const data = await this.gQuestionService.getData(this.levelId);
    this.questionList = data;
  } 

  async onSelectAnswer(questionIndex: number, value: string) {
    if (this.clicked) return;
    this.clicked = true;

    const question = this.questionList[questionIndex];
    const correctAnswer = question.answer; // <-- already the text

    this.answerList[questionIndex] = {
      question: question.question,
      selected_q: value,
      correctAnswer: correctAnswer,
      isCorrect: value === correctAnswer,
    };

    if (this.questionCurrent === this.questionList.length - 1) {
      this.allAnswers = this.allAnswers.concat(this.answerList);

      if (this.currentLevel < this.totalLevels) {
        await this.startLevel(this.currentLevel + 1);
      } else {
        this.showResultPopup();
      }
    } else {
      this.questionCurrent++;
    }

    this.clicked = false;
  }

  async showResultPopup() {
    const correctCount = this.allAnswers.filter((a) => a.isCorrect).length;
    const message = `You answered ${correctCount} out of 30 questions correctly.`;

    const alert = await this.alertCtrl.create({
      header: 'Quiz Complete!',
      message: message,
      buttons: [
        {
          text: 'Play Again',
          handler: () => {
            // Reset state and start from level 1
            this.resetQuiz();
            this.startLevel(1);
          },
        },
        {
          text: 'OK',
          role: 'cancel',
        },
      ],
    });
    await alert.present();
  }

  private resetQuiz() {
    this.currentLevel = 1;
    this.allAnswers = [];
    this.questionCurrent = 0;
    this.answerList = [];
    // No need to reset totalCorrect, always use allAnswers for calculation
  }

  // Intercept browser/tab close
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (
      !this.isNavigatingAway &&
      (this.currentLevel > 1 || this.questionCurrent > 0)
    ) {
      $event.returnValue = true;
    }
  }

  // Intercept Ionic/Angular navigation (hardware back, router back, etc.)
  async ionViewCanLeave(): Promise<boolean> {
    if (
      this.isNavigatingAway ||
      (this.currentLevel === 1 && this.questionCurrent === 0)
    ) {
      return true;
    }
    const alert = await this.alertCtrl.create({
      header: 'Are you sure?',
      message: 'Leaving will not save your progress and will reset the quiz.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => false,
        },
        {
          text: 'Leave',
          role: 'destructive',
          handler: () => {
            this.resetQuiz();
            this.isNavigatingAway = true;
            this.navCtrl.back();
          },
        },
      ],
      backdropDismiss: false,
    });
    await alert.present();
    return false;
  }

  async confirmLeave() {
    const alert = await this.alertCtrl.create({
      header: 'Are you sure?',
      message: 'Leaving will not save your progress and will reset the quiz.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Leave',
          role: 'destructive',
          handler: () => {
            this.resetQuiz();
            this.navCtrl.back();
          },
        },
      ],
      backdropDismiss: false,
    });
    await alert.present();
  }
}
