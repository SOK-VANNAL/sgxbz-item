import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { UnitAdd } from './unit.service';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { UnitService } from './unit.service';
import { TranslateService } from '@ngx-translate/core';
import { UnitUiService } from './unit-ui.service';
import {MyValidators} from '../../share/validator/my-validators.service';

@Component({
  selector: 'app-unit-add',
  template: `
    <div *nzModalTitle>
      <span>{{ 'add_new'|translate}}</span>
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
})

export class UnitAddComponent implements OnInit{
  constructor(
    private fb: FormBuilder,
    private ref: NzModalRef<UnitAddComponent>,
    private unitService: UnitService,
    private resource: TranslateService,
    private uiService: UnitUiService
  ) {}
  loading = false;
  frm: FormGroup;
  unit: UnitAdd = {};
  autoTips = MyValidators.autoTips;
  ngOnInit(): void {
    this.initControl();
  }
  initControl(): void{
    const {nameMaxLengthValidator, noteMaxLengthValidator, nameExistValidator, required} = MyValidators;
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
