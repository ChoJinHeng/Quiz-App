import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonApp,
  IonRouterOutlet,
  IonHeader,
  IonToolbar,
  IonContent,
  IonButton,
} from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app//components/header/header.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonContent,
    IonToolbar,
    IonHeader,
    IonButton,
    HeaderComponent,
    RouterLink,
  ],
})
export class HomePage {
  constructor() {}
  showTitle = true;
  showQuestionOptions = false;
  showQuestionsAnswer = true;
}
