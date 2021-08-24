import { Component, forwardRef, HostBinding, Input, Output, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormBuilder,
  Validator, Validators
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { EventEmitter} from '@angular/core';
import { LocalStorageService } from '@sgxbz/shared';

@Component({
  selector: 'app-page-length-filter',
  template: `
    <nz-select [(ngModel)]="val" (ngModelChange)="handleChange($event)" [disabled]="disabled" style="width: 100%">
      <nz-option [nzValue]="item.value" [nzLabel]="item.value + ' ' + translateService.instant('items')" *ngFor="let item of itemTypeClass"></nz-option>
    </nz-select>
  `,
  styles: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PageLengthFilterComponent),
      multi: true
    }
  ]
})

export class PageLengthFilterComponent implements ControlValueAccessor, OnInit{
  constructor(
    private translateService: TranslateService,
    private localStorageService: LocalStorageService
  ) {}
  @Input() disabled = false;
  @Input() storageKey: string;
  @Output() filterChanged: EventEmitter<any> = new EventEmitter();
  itemTypeClass = [
    {
      value: 10,
    },
    {
      value: 25,
    },
    {
      value: 50,
    }
  ];
  val: number;
  onChange: any = () => {};
  onTouch: any = () => {};
  set value(val){
    this.val = val;
    this.onChange(val);
    this.onTouch(val);
  }
  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  handleChange(value: any): void{
    this.value = value;
    if (this.storageKey) {
      this.localStorageService.setValue({key: this.storageKey, value});
    }
    this.filterChanged.emit(value);
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnInit(): void {
    if (this.storageKey) {
      this.localStorageService.getValue(this.storageKey) ? this.value = this.localStorageService.getValue(this.storageKey) : this.val = 10;
      this.filterChanged.emit(this.val);
    }
  }
}
