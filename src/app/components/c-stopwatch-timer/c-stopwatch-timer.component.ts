import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'c-stopwatch-timer',
  template: `
    <div
      style="width: 100px;position: relative;"
      [ngClass]="{ 'last-few-secs': count < 6 && count != 0 }"
    >
      <div
        style="background-color: white;
    border-radius: 50%;
    width: 80%;
    height: 62%;
    top: 19%;
    left: 10%;
    position: absolute;"
      ></div>
      <div
        style="position: absolute;
    z-index: 1;
    bottom: 11%;
    left: 7%;
    height: 73%;
    width: 87%;
    background-color: white;
    border-radius: 50%;"
      >
        <div class="wrapper">
          <div
            class="leftHalf"
            [style.opacity]="rotateValue >= 0 && rotateValue <= 180 ? '1' : '0'"
          ></div>
          <div
            class="spinner"
            [style.transform]="'rotate(' + rotateValue + 'deg)'"
            [style.left]="offsetSpinnerEl"
          ></div>
          <div
            class="rightHalf"
            [style.opacity]="
              rotateValue >= 181 && rotateValue <= 360 ? '1' : '0'
            "
          ></div>
        </div>
      </div>

      <img
        draggable="false"
        style="width: 100%;position: relative;z-index: 5;"
        src="assets/images/E-Game Screen/egame-timer.png"
        alt=""
      />
      <span class="count">{{ count }}</span>
    </div>
  `,
  styleUrls: ['./c-stopwatch-timer.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class CStopwatchTimerComponent implements OnInit, AfterViewInit {
  constructor() {}

  private defaultTimer = 25;
  timer = this.defaultTimer;
  count = this.defaultTimer;
  interval: any = null;

  @Output()
  nextEmitter = new EventEmitter<any>();

  ngOnInit() {}
  ngAfterViewInit(): void {}

  get rotateValue() {
    return ((this.timer - this.count) / this.timer) * 360;
  }

  get offsetSpinnerEl() {
    if (this.rotateValue >= 0 && this.rotateValue <= 180) return '-1px';
    if (this.rotateValue >= 181 && this.rotateValue <= 360) return '1px';
    return '0';
  }

  reset() {
    this.timer = this.defaultTimer;
    this.count = this.defaultTimer;
    this.startCountDown();
  }

  startCountDown() {
    if (this.interval) {
      this.stopCountDown();
    }
    this.count = this.timer;

    this.interval = setInterval(() => {
      if (this.count === 1) {
        this.nextEmitter.emit();
      } else {
        this.count = this.count -= 1;
      }
    }, 1000);
  }

  stopCountDown() {
    clearInterval(this.interval);
    this.interval = null;
  }

  getCurrentTime() {
    return this.count;
  }

  Init(value: number) {
    this.defaultTimer = value;
    this.timer = value;
    this.count = value;
  }
}
