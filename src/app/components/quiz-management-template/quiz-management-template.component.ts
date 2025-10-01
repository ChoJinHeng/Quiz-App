import { Component, OnInit } from '@angular/core';
import { PopoverComponent } from '../popover/popover.component';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { IonButton, ModalController, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-quiz-management-template',
  templateUrl: './quiz-management-template.component.html',
  styleUrls: ['./quiz-management-template.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    IonButton,
    SearchbarComponent,
    PopoverComponent,
    IonIcon,
  ],
})
export class QuizManagementTemplateComponent implements OnInit {
  constructor(private modalCtrl: ModalController) {
    addIcons({ add });
  }

  ngOnInit() {}

  quizProperties = [
    {
      dropDownTitle: 'Category',
      dropDownContent: [
        {
          id: 1,
          contentTitle: 'Single Answer Quiz',
        },
        {
          id: 2,
          contentTitle: 'Multi Answer Quiz',
        },
        {
          id: 3,
          contentTitle: 'Mix Answer Quiz',
        },
      ],
    },
  ];

  message =
    'This modal example uses the modalController to present and dismiss modals.';
  async openModal() {
    const presentingElement = document.querySelector('.ion-page');
    const modal = await this.modalCtrl.create({
      component: ModalComponent,
      canDismiss: true,
      presentingElement:
        presentingElement instanceof HTMLElement
          ? presentingElement
          : undefined,
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      this.message = `Created quiz: ${data}`;
    }
  }
}
