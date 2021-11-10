import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ItemEdit, ItemService } from './item.service';
import { ItemTypeService } from '../item-type/item-type.service';
import { ItemUiService } from './item-ui.service';
import { CommonValidators } from '@sgxbz/shared';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-item-add',
  template: `
    <div *nzModalTitle>
      <span *ngIf="!id">{{ 'add'|translate}}</span>
      <span *ngIf="id">
        {{ (item?.name || ('loading'|translate)) | textLimit:50}}
        </span>
    </div>
    <div class="modal-content">
      <nz-spin *ngIf="loading"></nz-spin>
      <form nz-form [formGroup]="frm" (ngSubmit)="submit()" style="display: flex; justify-content: space-around" [nzAutoTips]="autoTips">
        <div nz-col [nzSpan]="11">
          <nz-form-item>
            <nz-form-label [nzSm]="8" [nzXs]="24" nzRequired>{{
              "code" | translate
              }}</nz-form-label>
            <nz-form-control [nzSm]="16" [nzXs]="24" nzErrorTip="" nzHasFeedback>
              <input nz-input formControlName="code"/>
            </nz-form-control>
          </nz-form-item>
          <nz-form-item>
            <nz-form-label [nzSm]="8" [nzXs]="24" nzRequired>{{
              "item_type" | translate
              }}</nz-form-label>
            <nz-form-control [nzSm]="16" [nzXs]="24" nzErrorTip="">
              <app-item-type-select [allItemOption]="false" formControlName="itemTypeId"></app-item-type-select>
            </nz-form-control>
          </nz-form-item>
          <nz-form-item>
            <nz-form-label [nzSm]="8" [nzXs]="24" nzRequired>{{
              "name" | translate
              }}</nz-form-label>
            <nz-form-control [nzSm]="16" [nzXs]="24" nzErrorTip="" nzHasFeedback>
              <input nz-input formControlName="name"/>
            </nz-form-control>
          </nz-form-item>
          <nz-form-item>
            <nz-form-label [nzSm]="8" [nzXs]="24">{{
              "detail" | translate
              }}</nz-form-label>
            <nz-form-control [nzSm]="16" [nzXs]="24" nzErrorTip="">
              <textarea
                nz-input
                type="text"
                formControlName="detail"
                rows="3"
              ></textarea>
            </nz-form-control>
          </nz-form-item>
          <nz-form-item>
            <nz-form-label [nzSm]="8" [nzXs]="24">{{
              "note" | translate
              }}</nz-form-label>
            <nz-form-control [nzSm]="16" [nzXs]="24" nzErrorTip="">
              <textarea
                nz-input
                type="text"
                formControlName="note"
                rows="3"
              ></textarea>
            </nz-form-control>
          </nz-form-item>
          <nz-form-item>
            <nz-form-control [nzSm]="16" [nzXs]="24" [nzOffset]="8" nzErrorTip="">
              <div>
                <label nz-checkbox formControlName="isSale">{{'is_sale' | translate}}</label>
              </div>
              <div>
                <label nz-checkbox formControlName="isPurchase">{{'is_purchase' | translate}}</label>
              </div>
            </nz-form-control>
          </nz-form-item>
        </div>
        <div nz-col [nzSpan]="11">
          <nz-form-item>
            <nz-form-label [nzSm]="8" [nzXs]="24">
              {{ "picture" | translate }}
            </nz-form-label>
            <nz-form-control [nzSm]="16" [nzXs]="24" nzErrorTip="">
              <app-image-picker style="width:100px;height: 100px;display: inline-block;" formControlName="image">
              </app-image-picker>
            </nz-form-control>
          </nz-form-item>
          <nz-form-item>
            <nz-form-label [nzSm]="8" [nzXs]="24" nzRequired>{{
              "barcode" | translate
              }}</nz-form-label>
            <nz-form-control [nzSm]="16" [nzXs]="24" nzErrorTip="" nzHasFeedback>
              <input nz-input formControlName="barcode"/>
            </nz-form-control>
          </nz-form-item>
          <nz-form-item>
            <nz-form-label [nzSm]="8" [nzXs]="24" nzRequired>{{
              "unit" | translate
              }}</nz-form-label>
            <nz-form-control [nzSm]="16" [nzXs]="24" nzErrorTip="">
              <app-unit-select formControlName="unitId"></app-unit-select>
            </nz-form-control>
          </nz-form-item>
          <nz-form-item>
            <nz-form-label [nzSm]="8" [nzXs]="24" nzRequired>{{
              "cost" | translate
              }}</nz-form-label>
            <nz-form-control [nzSm]="16" [nzXs]="24" nzErrorTip="">
              <nz-input-group [nzPrefix]="prefixTemplateCost">
                <input nz-input formControlName="cost"/>
              </nz-input-group>
              <ng-template #prefixTemplateCost>{{'$' | translate}}</ng-template>
            </nz-form-control>
          </nz-form-item>
          <nz-form-item>
            <nz-form-label [nzSm]="8" [nzXs]="24" nzRequired>{{
              "price" | translate
              }}</nz-form-label>
            <nz-form-control [nzSm]="16" [nzXs]="24" nzErrorTip="">
              <nz-input-group [nzPrefix]="prefixTemplatePrice">
                <input nz-input formControlName="price"/>
              </nz-input-group>
              <ng-template #prefixTemplatePrice>{{'$' | translate}}</ng-template>
            </nz-form-control>
          </nz-form-item>
        </div>
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

export class ItemEditComponent implements OnInit{
  constructor(
    private fb: FormBuilder,
    private ref: NzModalRef<ItemEditComponent>,
    private itemService: ItemService,
    private itemTypeService: ItemTypeService,
    private uiService: ItemUiService,
    private resource: TranslateService
  ) {
  }
  @Input() id: number;
  autoTips = CommonValidators.autoTips;
  loading = false;
  frm: FormGroup;
  item: ItemEdit = {};
  itemCode: string;
  errMessage = '';
  ngOnInit(): void {
    this.loading = true;
    this.initControl(this.item);
    this.itemService.find(this.id).subscribe(
      result => {
        this.loading = false;
        this.item = result;
        this.itemCode = result.code;
        this.frm.setValue({
          code: result.code,
          itemTypeId: result.itemTypeId,
          name: result.name,
          detail: result.detail,
          note: result.note,
          image: result.image,
          barcode: result.barcode,
          unitId: result.unitId,
          cost: result.cost,
          price: result.price,
          isSale: result.isSale,
          isPurchase: result.isPurchase
        });
      },
      err => {
        console.log(err);
      }
    );
  }
  initControl(item: ItemEdit): void{
    const {nameMaxLengthValidator, noteMaxLengthValidator, codeMaxLengthValidator, required, pattern, nameExistValidator, codeExistValidator, barcodeExistValidator, priceValidator} = CommonValidators;
    this.frm = this.fb.group({
      code: [{value: item?.code, disabled: true }, [required, codeMaxLengthValidator()], [codeExistValidator(this.itemService, this.id)]],
      itemTypeId: [item?.itemTypeId, [required]],
      name: [item?.name, [required, nameMaxLengthValidator()], [nameExistValidator(this.itemService, this.id)]],
      detail: [item?.detail, [noteMaxLengthValidator()]],
      note: [item?.note, [noteMaxLengthValidator()]],
      image: [item?.image, []],
      barcode: [item?.barcode, [codeMaxLengthValidator()], [barcodeExistValidator(this.itemService, this.id)]],
      unitId: [item?.unitId, [required]],
      cost: [item?.cost, [required, priceValidator]],
      price: [item?.price, [required, priceValidator]],
      isSale: [item?.isSale, []],
      isPurchase: [item?.isPurchase, []]
    });
  }
  submit(): void{
    if (this.frm.valid){
      this.loading = true;
      this.itemTypeService.find(this.frm.value.itemTypeId).subscribe(
        result => {
          this.item = {
            ...this.frm.value,
            code: this.itemCode,
            cost: +this.frm.value.cost,
            price: +this.frm.value.price,
            itemType: result.name,
            id: this.id,
            tags: null,
            variants: []
          };
          this.item.itemType = result.name;
          this.itemService.edit(this.item).subscribe(
            data => {
              this.loading = false;
              this.ref.triggerOk();
            },
            err => {
              console.log(err);
              this.loading = false;
              this.errMessage = err.error.Error;
              this.uiService.showErrorNotification(this.errMessage);
            }
          );
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
