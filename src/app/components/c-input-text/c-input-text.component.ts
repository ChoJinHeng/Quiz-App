// https://blog.thoughtram.io/angular/2016/07/27/custom-form-controls-in-angular-2.html

import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';
import {
  FormGroup,
  FormsModule,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ControlContainer,
} from '@angular/forms';
import { Keyboard } from '@capacitor/keyboard';
import { IonicModule } from '@ionic/angular';
import { Subject } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'c-input-text',
  template: ` <div
    [class]="'input-wrapper ' + theme"
    [class.is-disabled]="isDisabled"
  >
    <!-- span on two side to centralize the input -->
    <span style="width: 24px;" class="extra-space"> </span>
    <input
      class="custom-text-input"
      #input
      [type]="type"
      [placeholder]="placeholder"
      [(ngModel)]="value"
      (input)="onChange($event)"
      [attr.maxlength]="maxlength"
      (focus)="scrollTo($event)"
      (blur)="onBlur.emit()"
      (keypress)="onKeypress($event)"
    />
    <span style="width: 24px;">
      <ng-container *ngIf="_type === 'password'">
        <ion-icon
          name="eye-outline"
          *ngIf="show"
          (click)="changePasswordVisibility()"
        ></ion-icon>
        <ion-icon
          name="eye-off-outline"
          *ngIf="!show"
          (click)="changePasswordVisibility()"
        ></ion-icon
      ></ng-container>
    </span>
  </div>`,
  styleUrls: ['./c-input-text.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CInputTextComponent),
      multi: true,
    },
  ],
})
export class CInputTextComponent
  implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy
{
  @Input('placeholder') placeholder: string = '';
  @Input('value') value: string = '';
  @Input('type') _type: 'text' | 'password' | 'number' | 'tel' = 'text';
  @Input('class') inputClass = '';
  @Input() theme: 'default' | 'theme1' = 'default';
  @Input() showPassword: boolean;
  @Input() maxlength: string | undefined;
  @Input() noSpace: boolean = false;
  @Output() showPasswordChange = new EventEmitter<boolean>();
  @Output() valueChange = new EventEmitter<string>();
  destroy$ = new Subject();
  @ViewChild('input') input: ElementRef<HTMLInputElement>;
  @Output() onBlur = new EventEmitter()
  @Output() onFocus = new EventEmitter()

  _showPassword = false;
  isDisabled = false;
  get show() {
    if (this.showPassword !== undefined) {
      return this.showPassword;
    }
    return this._showPassword;
  }

  changePasswordVisibility() {
    if (this.showPassword !== undefined) {
      this.showPasswordChange.next(!this.show);
    }
    this._showPassword = !this._showPassword;
  }

  get type() {
    if (this._type === 'password') {
      return this.show ? 'text' : 'password';
    }
    return this._type;
  }

  constructor(
    private controlContainer: ControlContainer,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.controlContainer.valueChanges
      .pipe(
        tap(() => {
          this.checkDisabled();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngAfterViewInit(): void {
    this.checkDisabled();
    // Manually triggering angular change detect to avoid ExpressionChangedAfterItHasBeenCheckedError error.
    this.cd.detectChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  scrollTo(event: Event) {
    this.onFocus.emit()
    let el = (event.currentTarget as HTMLElement).parentElement;
    let elLocation = el.offsetTop;
    if (document.getElementsByClassName('form-area').length > 0)
      document.getElementsByClassName('form-area')[0].scrollTop = elLocation;
  }

  checkDisabled() {
    if (this.controlContainer?.disabled) {
      this.isDisabled = true;
      this.input.nativeElement.disabled = true;
    } else {
      this.isDisabled = false;
      this.input.nativeElement.disabled = false;
    }
  }

  onKeypress(event: KeyboardEvent) {
    if (this.noSpace) {
      if (event.key == ' ') {
        event.preventDefault();
        return;
      }
    }
    if(event.key === "Enter"){
      this.dismessKeyboard();
      let submitBtn = document.getElementById('loginBtn');
      submitBtn.click();
    }
  }

  onChange(event: any) {
    let tempValue =
      this.inputClass == 'lowercased'
        ? (event.target as HTMLInputElement).value.toLocaleLowerCase()
        : (event.target as HTMLInputElement).value;
    this.propagateChange(tempValue);
    this.valueChange.emit(event);

    if (this.noSpace) {
      event.target.value = event.target.value.replace(/\s+/g, '').trim();
    }
  }
  dismessKeyboard(){
    Keyboard.hide();
  }
  writeValue(value: any) {
    this.value = value;
  }

  propagateChange = (_: any) => {};

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}
}
