import { Component, forwardRef, HostBinding, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormBuilder,
  Validator, Validators
} from '@angular/forms';

@Component({
  selector: 'app-item-class-select',
  template: `
    <nz-select [(ngModel)]="val" (ngModelChange)="handleChange($event)" [disabled]="disabled">
      <nz-option [nzValue]="item.value" [nzLabel]="item.label" *ngFor="let item of itemTypeClass"></nz-option>
    </nz-select>
  `,
  styles: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ItemClassSelectComponent),
      multi: true
    }
  ]
})

export class ItemClassSelectComponent implements ControlValueAccessor{
  constructor() {
  }
  @Input() disabled = false;
  itemTypeClass = [
    {
      value: 1,
      label: 'Service'
    },
    {
      value: 2,
      label: 'NoStock',
    },
    {
      value: 3,
      label: 'Stock'
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
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
