import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzModalRef} from 'ng-zorro-antd/modal';
import {ItemView, ItemService} from './item.service';
import { ItemUiService } from './item-ui.service';

@Component({
  selector: 'app-item-view',
  template: `
    <div *nzModalTitle>
      <span *ngIf="!id">{{ 'add'|translate}}</span>
      <span *ngIf="id">
        {{ (item?.name || ('loading'|translate)) | textLimit:50}}
        </span>
    </div>
    <div class="modal-content">
      <nz-spin *ngIf="loading"></nz-spin>
      <form nz-form [formGroup]="frm" style="display: flex; justify-content: space-around">
        <div nz-col [nzSpan]="11">
          <nz-form-item>
            <nz-form-label [nzSm]="8" [nzXs]="24" nzRequired>{{
              "code" | translate
              }}</nz-form-label>
            <nz-form-control [nzSm]="16" [nzXs]="24" nzErrorTip="">
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
            <nz-form-control [nzSm]="16" [nzXs]="24" nzErrorTip="">
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
            <nz-form-label [nzSm]="8" [nzXs]="24">{{
              "barcode" | translate
              }}</nz-form-label>
            <nz-form-control [nzSm]="16" [nzXs]="24" nzErrorTip="">
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
        <a (click)="uiService.showEdit(item.id)" *ngIf="!loading">
          <i nz-icon nzType="edit" nzTheme="outline"></i>
          <span class="action-text"> {{ "edit" | translate }}</span>
        </a>
        <nz-divider nzType="vertical" *ngIf="!loading"></nz-divider>
        <a nz-typography nzType="danger" (click)="uiService.showDelete(item.id)" *ngIf="!loading">
          <i nz-icon nzType="delete" nzTheme="outline"></i>
          <span class="action-text"> {{ "delete" | translate }}</span>
        </a>
        <nz-divider nzType="vertical" *ngIf="!loading"></nz-divider>
        <a nz-typography nzType="" (click)="uiService.showAdd(item.id)" style="color: green" *ngIf="!loading">
          <i nz-icon nzType="copy" nzTheme="outline"></i>
          <span class="action-text"> {{ "copy" | translate }}</span>
        </a>
        <nz-divider nzType="vertical" *ngIf="!loading"></nz-divider>
        <a nz-button  style="border: none; background: none; box-shadow: none; padding: 0px" (click)="cancel()">
          <i nz-icon nzType="close" nzTheme="outline"></i>
          <span class="action-text"> {{ "close" | translate }}</span>
        </a>
      </div>
    </div>
  `,
  styles: [`
    .modal-content{
      padding: 20px;
    }
  `],
})
export class ItemViewComponent implements OnInit, OnDestroy{
  constructor(
    private fb: FormBuilder,
    private ref: NzModalRef<ItemViewComponent>,
    private itemService: ItemService,
    private uiService: ItemUiService
  ) {}
  @Input() id: number;
  loading = false;
  frm: FormGroup;
  item: ItemView = {};
  refreshSub$: any;
  ngOnInit(): void {
      this.loading = true;
      this.initControl(this.item);
      this.refreshSub$ = this.uiService.refresher.subscribe(
        (e) => {
          if (e.key === 'deleted' || e.key === 'added') {
            this.ref.triggerCancel();
          }
          else if (e.key === 'edited'){
            this.item = e.value;
            this.frm.setValue({
              code: e.value.code,
              itemTypeId: e.value.itemTypeId,
              name: e.value.name,
              detail: e.value.detail,
              note: e.value.note,
              image: e.value.image,
              barcode: e.value.barcode,
              unitId: e.value.unitId,
              cost: e.value.cost,
              price: e.value.price,
              isSale: e.value.isSale,
              isPurchase: e.value.isPurchase
            });
          }
        },
        err => {
          console.log(err);
        }
      );
      this.itemService.find(this.id).subscribe(
        result => {
          this.loading = false;
          this.item = result;
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
    initControl(item: ItemView): void{
      this.frm = this.fb.group({
        code: [{value: item.code, disabled: true}, [Validators.required]],
        itemTypeId: [{value: item.itemTypeId, disabled: true}, [Validators.required]],
        name: [{value: item.name, disabled: true}, [Validators.required]],
        detail: [{value: item.detail, disabled: true}, []],
        note: [{value: item.note, disabled: true}, []],
        image: [{value: item.image, disabled: true}, []],
        barcode: [{value: item.barcode, disabled: true}, []],
        unitId: [{value: item.unitId, disabled: true}, [Validators.required]],
        cost: [{value: item.cost, disabled: true}, [Validators.required, Validators.pattern('-?[0-9]+(\\.[0-9][0-9]?)?')]],
        price: [{value: item.price, disabled: true}, [Validators.required, Validators.pattern('-?[0-9]+(\\.[0-9][0-9]?)?')]],
        isSale: [{value: item.isSale, disabled: true}, []],
        isPurchase: [{value: item.isPurchase, disabled: true}, []]
      });
    }
    cancel(): void{
      this.ref.triggerCancel();
    }

  ngOnDestroy(): void {
    this.refreshSub$?.unsubscribe();
  }
}
