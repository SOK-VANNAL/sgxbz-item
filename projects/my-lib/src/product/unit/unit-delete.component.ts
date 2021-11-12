import { Component, OnInit, Input } from '@angular/core';
import { UnitDelete, UnitService } from './unit.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import {finalize, switchMap} from 'rxjs/operators';
import { MessageHelperService } from '@sgxbz/shared';
import {HttpErrorResponse} from '@angular/common/http';
import { CommonValidators } from '@sgxbz/shared';

@Component({
  selector: 'app-unit-delete',
  template: `
    <div *nzModalTitle>
      <span *ngIf="!id">{{ 'add'|translate}}</span>
      <span *ngIf="id">{{ (unit?.name || ('loading'|translate)) | textLimit:30}}</span>
    </div>
    <div class="modal-content">
      <nz-spin *ngIf="loading" style="position: absolute; top: 50%; left: 50%"></nz-spin>
      <div *ngIf="errMessage && !loading" style="text-align: center; margin-top: 10px">
        <span nz-typography nzType="danger">{{errMessage}}</span>
      </div>
      <form nz-form [formGroup]="frm" (ngSubmit)="submit()">
        <nz-form-item>
          <nz-form-label [nzSm]="7" [nzXs]="24" nzRequired>{{
            "name" | translate
            }}</nz-form-label>
          <nz-form-control [nzSm]="15" [nzXs]="24" nzErrorTip="">
            <input nz-input formControlName="name"/>
          </nz-form-control>
        </nz-form-item>

        <nz-form-item *ngIf="!errMessage && unit.name">
          <nz-form-label [nzSm]="7" [nzXs]="12">{{
            "note" | translate
            }}</nz-form-label>
          <nz-form-control [nzSm]="15" [nzXs]="24" nzErrorTip="">
            <textarea nz-input type="text" formControlName="note" rows="5"></textarea>
          </nz-form-control>
        </nz-form-item>
      </form>

      <div *nzModalFooter>
        <button *ngIf="!errMessage && unit.name" nz-button nzDanger nzType="primary" [disabled]="!frm.valid" (click)="submit()" >
          <i *ngIf="loading" nz-icon nzType="loading"></i>
          {{ "delete" | translate }}
        </button>
        <button nz-button nzType="default" (click)="cancel()">
          {{ "cancel" | translate }}
        </button>
      </div>
    </div>
  `,
  styleUrls: ['../../../../../node_modules/@sgxbz/shared/assets/styles/operation.page.scss']
})

export class UnitDeleteComponent implements OnInit{
  constructor(
    private fb: FormBuilder,
    private ref: NzModalRef<UnitDeleteComponent>,
    private unitService: UnitService,
    private message: MessageHelperService
  ) {}
  @Input() id = 0;
  loading = false;
  unit: UnitDelete = {};
  frm: FormGroup;
  errMessage: string;
  ngOnInit(): void {
    this.initControl(this.unit);
    if (this.id){
      this.loading = true;
      const canRemove$ = this.unitService.inused(this.id);
      const find$ = canRemove$.pipe(switchMap(x => {
        if (!x.can){ this.errMessage = x.message; }
        return this.unitService.find(this.id);
      }));
      find$.pipe(finalize(() => this.loading = false))
        .subscribe(result => {
          this.unit = result;
          this.frm.setValue({
            name: result.name,
            note: ''
          });
        });
    }
  }
  initControl(unit: UnitDelete): void{
    const { noteMaxLengthValidator } = CommonValidators;
    this.frm = this.fb.group({
      name: [{value: unit?.name, disabled: true}, [Validators.required]],
      note: [null, [ noteMaxLengthValidator() ]]
    });
  }
  submit(): void{
    if (this.loading) { return; }
    if (!this.frm.valid ) { return; }
    this.loading = true;
    this.unit.note = this.frm.value.note;
    this.unit.id = this.id;
    this.unitService.delete(this.unit).subscribe(
      result => {
        this.loading = false;
        this.ref.triggerOk();
      },
      (err: HttpErrorResponse) => {
        this.loading = false;
        this.message.msgHttpErr(err);
      }
    );
  }
  cancel(): void{
    this.ref.triggerCancel();
  }
}
