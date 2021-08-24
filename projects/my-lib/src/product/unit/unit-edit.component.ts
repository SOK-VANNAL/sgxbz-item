import { Component, Input, OnInit } from '@angular/core';
import { UnitEdit } from './unit.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { UnitService } from './unit.service';
import { TranslateService } from '@ngx-translate/core';
import { CommonValidators } from '@sgxbz/shared';

@Component({
  selector: 'app-unit-edit',
  template: `
    <div *nzModalTitle>
      <span *ngIf="!id">{{ 'add'|translate}}</span>
      <span *ngIf="id">
        {{ (unit?.name || ('loading'|translate)) | textLimit: 30}}
        </span>
    </div>
    <div class="modal-content">
      <nz-spin *ngIf="loading"></nz-spin>
      <form nz-form [formGroup]="frm" (ngSubmit)="submit()" [nzAutoTips]="autoTips">
        <nz-form-item>
          <nz-form-label [nzSm]="8" [nzXs]="24" nzRequired>{{
            "name" | translate
            }}</nz-form-label>
          <nz-form-control [nzSm]="14" [nzXs]="24" nzErrorTip="" nzHasFeedback>
            <input nz-input formControlName="name" />
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label [nzSm]="8" [nzXs]="24">{{
            "note" | translate
            }}</nz-form-label>
          <nz-form-control [nzSm]="14" [nzXs]="24" nzErrorTip="">
              <textarea
                nz-input
                type="text"
                formControlName="note"
                rows="3"
              ></textarea>
          </nz-form-control>
        </nz-form-item>
      </form>
        <div *nzModalFooter>
          <button nz-button nzType="primary" [disabled]="!frm.valid" (click)="submit()">
            <i *ngIf="loading" nz-icon nzType="loading"></i>
            {{ "save" | translate }}
          </button>
          <button nz-button nzType="default" (click)="cancel()">
            {{ "cancel" | translate }}
          </button>
        </div>
    </div>
  `,
  styles: [`
    .modal-content{
      padding: 20px;
    }
  `],
})

export class UnitEditComponent implements OnInit{
  constructor(
    private fb: FormBuilder,
    private ref: NzModalRef<UnitEditComponent>,
    private unitService: UnitService,
    private resource: TranslateService
  ) {}
  @Input() id = 0;
  autoTips = CommonValidators.autoTips;
  loading = false;
  unit: UnitEdit = {};
  frm: FormGroup;
  ngOnInit(): void {
    this.initControl(this.unit);
    if (this.id){
      this.loading = true;
      this.unitService.find(this.id).subscribe(
        (result: UnitEdit) => {
          this.loading = false;
          this.unit = result;
          delete result.id;
          this.frm.setValue(result);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
  initControl(unit: UnitEdit): void{
    const {nameExistValidator, noteMaxLengthValidator, nameMaxLengthValidator, required} = CommonValidators;
    this.frm = this.fb.group({
      name: [unit?.name, [required, nameMaxLengthValidator()], [nameExistValidator(this.unitService, this.id)]],
      note: [unit?.note, [noteMaxLengthValidator()]],
    });
  }
  submit(): void{
    if (this.loading) { return; }
    if (!this.frm.valid ) { return; }
    this.loading = true;
    Object.assign(this.unit, this.frm.value);
    this.unit.id = this.id;
    this.unitService.edit(this.unit).subscribe(
      result => {
        this.loading = false;
        this.ref.triggerOk();
      },
      err => {
        this.loading = false;
        console.log(err);
      }
    );
  }
  cancel(): void{
    this.ref.triggerCancel();
  }
}
