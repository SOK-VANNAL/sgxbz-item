import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ItemTypeDelete} from './item-type.service';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ItemTypeService } from './item-type.service';
import {finalize, switchMap} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import { MessageHelperService } from '@sgxbz/shared';
import { CommonValidators } from '@sgxbz/shared';

@Component({
  selector: 'app-item-type-delete',
  template: `
    <div *nzModalTitle>
      <span *ngIf="!id">{{ 'add'|translate}}</span>
      <span *ngIf="id">{{ (itemType?.name || ('loading'|translate)) | textLimit:30}}</span>
    </div>
    <div class="modal-content">
      <nz-spin *ngIf="loading"></nz-spin>
      <div *ngIf="errMessage && !loading" style="text-align: center; margin-bottom: 10px">
        <span nz-typography nzType="danger">{{errMessage}}</span>
      </div>
      <form nz-form [formGroup]="frm" (ngSubmit)="submit()">
        <nz-form-item>
          <nz-form-label [nzSm]="8" [nzXs]="24" nzRequired>{{
            "item_class" | translate
            }}</nz-form-label>
          <nz-form-control [nzSm]="14" [nzXs]="24" nzErrorTip="">
            <app-item-class-select formControlName="itemClass"></app-item-class-select>
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label [nzSm]="8" [nzXs]="24">{{
            "name" | translate
            }}</nz-form-label>
          <nz-form-control [nzSm]="14" [nzXs]="24" nzErrorTip="">
            <input nz-input formControlName="name"/>
          </nz-form-control>
        </nz-form-item>
        <nz-form-item  *ngIf="!errMessage && itemType.id">
          <nz-form-label [nzSm]="8" [nzXs]="12" nzRequired>{{
            "note" | translate
            }}</nz-form-label>
          <nz-form-control [nzSm]="14" [nzXs]="24" nzErrorTip="">
            <textarea nz-input type="text" formControlName="note" rows="3"></textarea>
          </nz-form-control>
        </nz-form-item>
      </form>

      <div *nzModalFooter>
        <button *ngIf="!errMessage && itemType.id" nz-button nzDanger [disabled]="!frm.valid" (click)="submit()" >
          <i *ngIf="loading" nz-icon nzType="loading"></i>
          {{ "delete" | translate }}
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

export class ItemTypeDeleteComponent implements OnInit{
  constructor(
    private fb: FormBuilder,
    private ref: NzModalRef<ItemTypeDeleteComponent>,
    public itemTypeService: ItemTypeService,
    private message: MessageHelperService
  ) {}
  @Input() id = 0;
  loading = false;
  errMessage: string;
  frm: FormGroup;
  itemType: ItemTypeDelete = {};
  ngOnInit(): void {
    this.initControl(this.itemType);
    if (this.id){
      this.loading = true;
      const canRemove$ = this.itemTypeService.inused(this.id);
      const find$ = canRemove$.pipe(switchMap(x => {
        if (!x.can){ this.errMessage = x.message; }
        return this.itemTypeService.find(this.id);
      }));
      find$.pipe(finalize(() => this.loading = false))
        .subscribe(result => {
          this.itemType = result;
          this.frm.setValue({
            name: result.name,
            note: '',
            itemClass: result.itemClass
          });
        });
    }
  }
  initControl(itemType: ItemTypeDelete): void{
    const { noteMaxLengthValidator } = CommonValidators;
    this.frm = this.fb.group({
      name: [{value: itemType?.name, disabled: true}, [Validators.required]],
      note: [null, [noteMaxLengthValidator()]],
      itemClass: [{value: itemType?.itemClass, disabled: true}, [Validators.required]]
    });
  }
  submit(): void{
    if (this.loading){return; }
    if (!this.frm.valid){return; }
    this.loading = true;
    Object.assign(this.itemType, this.frm.value);
    this.itemTypeService.delete(this.itemType).subscribe(
      () => {
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
