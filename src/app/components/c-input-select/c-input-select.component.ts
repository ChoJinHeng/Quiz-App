import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface ISelectOptions {
  label: string;
  value: string | number;
  color?: string;
  isDisabled?: boolean;
}

@Component({
  selector: 'c-input-select',
  template: `
    <div #selectWrapper class="select-wrapper" tabindex="0" (blur)="onBlur()">
      <div class="select" (click)="toggleDropdown()">
        <span>{{ value ? value.label : placeholder }}</span>

        <div class="arrow" [class.rotate-up]="showDropdown">
          <img
            draggable="false"
            src="../../../assets/images/Forgot_Password/dropdown-arrow.png"
            alt=""
          />
        </div>
      </div>
      <div
        class="options"
        *ngIf="showDropdown"
        [style.max-height]="height + 'px'"
      >
        @for (item of options; track item.value) {
        <div
          class="option"
          (click)="onOptionClick(item); $event.stopPropagation()"
          [style.backgroundColor]="item.color"
        >
          {{ item.label }}
        </div>
        }
      </div>
    </div>
  `,
  styleUrls: ['./c-input-select.component.scss'],
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CInputSelectComponent),
      multi: true,
    },
  ],
})
export class CInputSelectComponent
  implements ControlValueAccessor, OnInit, AfterViewInit
{
  @Input('placeholder') placeholder: string = '';
  @Input('options') _options: ISelectOptions[] = [
    { label: 'Options 1', value: '1' },
    { label: 'Options 2', value: '2' },
    { label: 'Options 3', value: '3' },
  ];

  value: ISelectOptions = null;

  @ViewChild('selectWrapper') selectWrapper: ElementRef<HTMLDivElement>;

  showDropdown = false;

  get options() {
    if (this.value) {
      return [
        { ...this.value, color: '#5481e52b', isDisabled: true },
        ...this._options.filter((i) => i.value !== this.value.value),
      ];
    }
    return this._options;
  }

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {}

  height = 250;
  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.selectWrapper.nativeElement) {
        const boundingClientRect =
          this.selectWrapper.nativeElement.getBoundingClientRect();

        this.height =
          window.innerHeight -
          boundingClientRect.top -
          boundingClientRect.height -
          50;
      }
    }, 500);
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
  onBlur() {
    this.showDropdown = false;
  }

  onOptionClick(value: ISelectOptions) {
    if (value.isDisabled) return;
    this.showDropdown = false;
    this.propagateChange(value);
    this.value = value;
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
