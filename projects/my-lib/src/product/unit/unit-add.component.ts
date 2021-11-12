import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { UnitAdd } from './unit.service';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { UnitService } from './unit.service';
import { CommonValidators } from '@sgxbz/shared';

@Component({
  selector: 'app-unit-add',
  template: `
    <div *nzModalTitle>
      <span>{{ 'add_new'| translate}}</span>
    </div>
    <div class="modal-content">
      <nz-spin *ngIf="loading" style="position: absolute; top: 50%; left: 50%"></nz-spin>
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

        <div *nzModalFooter>
          <button nz-button nzType="primary" [disabled]="!frm.valid" (click)="submit()">
            <i *ngIf="loading" nz-icon nzType="loading"></i>
            {{ "save" | translate }}
          </button>
          <button nz-button nzType="default" (click)="cancel()">
            {{ "cancel" | translate }}
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .modal-content{
      padding: 20px;
    }
  `],
  styleUrls: ['../../../../../node_modules/@sgxbz/shared/assets/styles/operation.page.scss']
})

export class UnitAddComponent implements OnInit{
  constructor(
    private fb: FormBuilder,
    private ref: NzModalRef<UnitAddComponent>,
    private unitService: UnitService,
  ) {}
  loading = false;
  frm: FormGroup;
  unit: UnitAdd = {};
  autoTips = CommonValidators.autoTips;
  ngOnInit(): void {
    this.initControl();
  }
  initControl(): void{
    const {nameMaxLengthValidator, noteMaxLengthValidator, nameExistValidator, required} = CommonValidators;
    this.frm = this.fb.group({
      name: [null, [required, nameMaxLengthValidator()], [nameExistValidator(this.unitService)]],
      note: [null, [noteMaxLengthValidator()]]
    });
  }
  submit(): void{
    if (this.frm.valid){
      this.loading = true;
      this.unitService.add(this.frm.value).subscribe(
        result => {
          this.unit = result;
          this.loading = false;
          this.ref.triggerOk();
        },
        err => {
          console.log(err);
        }
      );
    }
  }
  cancel(): void{
    this.ref.triggerCancel();
  }
}
