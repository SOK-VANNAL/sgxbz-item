import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { ItemTypeEdit, ItemTypeService } from './item-type.service';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { TranslateService } from '@ngx-translate/core';
import { CommonValidators } from '@sgxbz/shared';

@Component({
  selector: 'app-item-type-edit',
  template: `
    <div *nzModalTitle class="modal-header-ellipsis">
      <span *ngIf="!id">{{ 'add'|translate}}</span>
      <span *ngIf="id">
        {{ (itemType?.name || ('loading'|translate))}}
        </span>
    </div>
    <div class="modal-content">
      <nz-spin *ngIf="loading" style="position: absolute; top: 50%; left: 50%"></nz-spin>
      <form nz-form [formGroup]="frm" (ngSubmit)="submit()" [nzAutoTips]="autoTips">
        <nz-form-item>
          <nz-form-label [nzSm]="7" [nzXs]="24" nzRequired>{{
            "item_class" | translate
            }}</nz-form-label>
          <nz-form-control [nzSm]="15" [nzXs]="24" nzErrorTip="">
            <app-item-class-select formControlName="itemClass"></app-item-class-select>
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label [nzSm]="7" [nzXs]="24" nzRequired>{{
            "name" | translate
            }}</nz-form-label>
          <nz-form-control [nzSm]="15" [nzXs]="24" nzErrorTip="" nzHasFeedback>
            <input nz-input formControlName="name" />
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label [nzSm]="7" [nzXs]="24">{{
            "note" | translate
            }}</nz-form-label>
          <nz-form-control [nzSm]="15" [nzXs]="24" nzErrorTip="">
              <textarea
                nz-input
                type="text"
                formControlName="note"
                rows="5"
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
  styleUrls: ['../../../../../node_modules/@sgxbz/shared/assets/styles/operation.page.scss']
})
export class ItemTypeEditComponent implements OnInit{
  constructor(
    private fb: FormBuilder,
    private ref: NzModalRef<ItemTypeEditComponent>,
    public itemTypeService: ItemTypeService,
    private resource: TranslateService,
    ) {}
  @Input() id = 0;
  autoTips = CommonValidators.autoTips;
  loading = false;
  itemType: ItemTypeEdit = {};
  frm: FormGroup;
  ngOnInit(): void {
    this.initControl(this.itemType);
    if (this.id){
      this.loading = true;
      this.itemTypeService.find(this.id).subscribe(
        (result: ItemTypeEdit) => {
          this.loading = false;
          this.itemType = result;
          delete result.id;
          this.frm.setValue({
            name: result.name,
            note: result.note,
            itemClass: result.itemClass
          });
        },
        (err) => {
          this.loading = false;
          console.log(err);
        }
      );
    }
  }
  initControl(itemType: ItemTypeEdit): void{
    const {nameExistValidator, nameMaxLengthValidator, noteMaxLengthValidator, required} = CommonValidators;
    this.frm = this.fb.group({
      name: [itemType?.name, [required, nameMaxLengthValidator()], [nameExistValidator(this.itemTypeService, this.id)]],
      note: [itemType?.note, [noteMaxLengthValidator()]],
      itemClass: [itemType?.itemClass, [required]]
    });
  }
  submit(): void{
    if (this.loading) { return; }
    if (!this.frm.valid ) { return; }
    this.loading = true;
    Object.assign(this.itemType, this.frm.value);
    this.itemType.id = this.id;
    this.itemTypeService.edit(this.itemType).subscribe(
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
