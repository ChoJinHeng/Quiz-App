import { Component, Input, input, OnInit } from '@angular/core';
import {
  IonButton,
  IonContent,
  IonItem,
  IonList,
  IonPopover,
  IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';

import {
  chevronDownCircle,
  chevronForwardCircle,
  chevronUpCircle,
  colorPalette,
  document,
  globe,
} from 'ionicons/icons';
@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
  imports: [IonIcon, IonButton, IonContent, IonItem, IonList, IonPopover],
})
export class PopoverComponent implements OnInit {
  constructor() {
    addIcons({
      chevronDownCircle,
      chevronForwardCircle,
      chevronUpCircle,
      colorPalette,
      document,
      globe,
    });
  }

  ngOnInit() {
    // console.log(this.dropdownDynamicData[0].dropDownTitle);
    // console.log(this.dropDownDynamicData[0]);
    // console.log(this.dropDownDynamicData[0].dropDownContent[0].contentTitle);
  }

  @Input() dropDownDynamicData: any[] = [];
}
