import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import {ItemService, ItemDelete} from './item.service';
import { ItemTypeService } from '../item-type/item-type.service';
import {finalize, switchMap} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {MessageHelperService} from '@sgxbz/shared';
import { CommonValidators } from '@sgxbz/shared';

@Component({
  selector: 'app-item-delete',
  template: `
    <div *nzModalTitle class="modal-header-ellipsis">
      <span *ngIf="!id">{{ 'add'|translate}}</span>
      <span *ngIf="id">{{ (item.name || ('loading'|translate))}}</span>
    </div>
    <div class="modal-content">
      <nz-spin *ngIf="loading" style="position: absolute; top: 50%; left: 50%"></nz-spin>
      <div *ngIf="errMessage && !loading" nz-row nzJustify="center" style="margin:2px 0">
        <span nz-typography nzType="danger" style="position: absolute">{{errMessage}}</span>
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

        <nz-form-item>
          <nz-form-label [nzSm]="7" [nzXs]="12">{{
            "note" | translate
            }}</nz-form-label>
          <nz-form-control [nzSm]="15" [nzXs]="24" nzErrorTip="">
            <textarea nz-input type="text" formControlName="note" rows="5"></textarea>
          </nz-form-control>
        </nz-form-item>
      </form>

      <div *nzModalFooter>
        <button *ngIf="!errMessage && item.name" nz-button nzDanger nzType="primary" [disabled]="frm.invalid" (click)="submit()" >
          <i *ngIf="loading" nz-icon nzType="loading"></i>
          {{ "delete" | translate }}
        </button>
        <button nz-button nzType="default" (click)="cancel()">
          {{ "cancel" | translate }}
        </button>
      </div>
    </div>
  `,
  styleUrls: ['../../../../../node_modules/@sgxbz/shared/assets/styles/operation.page.scss'],
  styles: [`
    ::ng-deep .ant-modal-body {
      padding: 0 !important;
    }
  `]
})

export class ItemDeleteComponent implements OnInit{
  constructor(
    private fb: FormBuilder,
    private ref: NzModalRef<ItemDeleteComponent>,
    private itemService: ItemService,
    private itemTypeService: ItemTypeService,
    private message: MessageHelperService
  ) {
  }
  @Input() id = 0;
  loading = false;
  item: ItemDelete = {};
  frm: FormGroup;
  errMessage: string;
  ngOnInit(): void {
    this.initControl(this.item);
    if (this.id){
      this.loading = true;
      const canRemove$ = this.itemService.inused(this.id);
      const find$ = canRemove$.pipe(switchMap(x => {
        if (!x.can){ this.errMessage = x.message; this.frm.disable()}
        return this.itemService.find(this.id);
      }));
      find$.pipe(finalize(() => this.loading = false))
        .subscribe(result => {
          this.item = result;
          this.frm.setValue({
            name: result.name,
            note: ''
          });
        });
    }
  }
  initControl(item: ItemDelete): void{
    const { noteMaxLengthValidator} = CommonValidators
    this.frm = this.fb.group({
      name: [{value: item?.name, disabled: true}, [Validators.required]],
      note: [null, [noteMaxLengthValidator()]]
    });
  }
  submit(): void{
    if (this.loading) { return; }
    if (!this.frm.valid ) { return; }
    this.loading = true;
    this.item.note = this.frm.value.note;
    this.item.id = this.id;
    this.itemService.delete(this.item).subscribe(
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
