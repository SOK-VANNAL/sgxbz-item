import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ItemAdd, ItemService } from './item.service';
import { ItemTypeService } from '../item-type/item-type.service';
import { ItemUiService } from './item-ui.service';
import { CommonValidators } from '@sgxbz/shared';
import {SysSettingService} from '@sgxbz/shared';

@Component({
  selector: 'app-item-add',
  template: `
    <div *nzModalTitle>
      <span *ngIf="id">{{'copy'|translate}}</span>
      <span *ngIf="!id">{{'add_new'|translate}}</span>
    </div>
    <div class="modal-content">
      <nz-spin *ngIf="loading"></nz-spin>
      <form nz-form [formGroup]="frm" (ngSubmit)="submit()" style="display: flex; justify-content: space-around" [nzAutoTips]="autoTips">
        <div nz-col [nzSpan]="11">
          <nz-form-item>
            <nz-form-label [nzSm]="8" [nzXs]="24" nzRequired >{{
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
export class ItemAddComponent implements OnInit{
  constructor(
    private fb: FormBuilder,
    private ref: NzModalRef<ItemAddComponent>,
    private itemService: ItemService,
    private itemTypeService: ItemTypeService,
    private uiService: ItemUiService,
    private settingService: SysSettingService
  ) {
    this.itemAutoId = +(this.settingService.current.get('item-autoid') ?? '0');
  }
  @Input() id?: number;
  autoTips = CommonValidators.autoTips;
  loading = false;
  frm: FormGroup;
  item: ItemAdd = {};
  errMessage = '';
  itemAutoId = 0;
  ngOnInit(): void {
    this.initControl(this.item);
    if (this.id){
      this.loading = true;
      this.itemService.clone(this.id).subscribe( result => {
        this.loading = false;
        this.frm.setValue({
          code: result.code,
          itemTypeId: result.itemTypeId,
          name: '',
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
          this.loading = false;
          console.log(err);
        }
      );
    }
  }
  initControl(item: ItemAdd): void{
    const {required, nameMaxLengthValidator, noteMaxLengthValidator, barcodeExistValidator,
      codeMaxLengthValidator, pattern, nameExistValidator, codeExistValidator, priceValidator} = CommonValidators;
    this.frm = this.fb.group({
      code: [{value: item?.code, disabled: !!this.itemAutoId}, [required, codeMaxLengthValidator()], [codeExistValidator(this.itemService, this.id ?? 0)]],
      itemTypeId: [item?.itemTypeId, [required]],
      name: [item?.name, [required, nameMaxLengthValidator()], [nameExistValidator(this.itemService)]],
      detail: [item?.detail, [noteMaxLengthValidator()]],
      note: [item?.note, [noteMaxLengthValidator()]],
      image: [item?.image, []],
      barcode: [item?.barcode, [codeMaxLengthValidator()], [barcodeExistValidator(this.itemService, this.id ?? 0)]],
      unitId: [item?.unitId, [required]],
      cost: [0, [required, priceValidator]],
      price: [0, [required, priceValidator]],
      isSale: [false, []],
      isPurchase: [false, []]
    });
  }
  submit(): void{
    if (this.frm.valid){
      this.loading = true;
      this.itemTypeService.find(this.frm.value.itemTypeId).subscribe(
        result => {
          this.item = {
            ...this.frm.value,
            cost: +this.frm.value.cost,
            price: +this.frm.value.price,
            itemType: result.name,
            variants: []
          };
          this.itemService.add(this.item).subscribe(
            data => {
              this.loading = false;
              this.item = data;
              this.ref.triggerOk();
            },
            err => {
              this.loading = false;
              this.errMessage = err.error.Error;
              this.uiService.showErrorNotification(this.errMessage);
            }
          );
        },
        err => {
          this.loading = false;
          console.log(err);
        }
      );
    }
  }
  cancel(): void{
    this.ref.triggerCancel();
  }
}
