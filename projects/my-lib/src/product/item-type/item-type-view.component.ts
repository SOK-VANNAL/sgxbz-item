import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ItemTypeView } from './item-type.service';
import { ItemTypeUiService } from './item-type-ui.service';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ItemTypeService } from './item-type.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-item-type-view',
  template: `
    <div *nzModalTitle class="modal-header-ellipsis">
      <span>{{ (itemType?.name || ('loading'|translate))}}</span>
    </div>
    <div class="modal-content">
      <nz-spin *ngIf="loading" style="position: absolute; top: 50%; left: 50%"></nz-spin>
      <form nz-form [formGroup]="frm">
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
          <nz-form-control [nzSm]="15" [nzXs]="24" nzErrorTip="">
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
        <a (click)="uiService.showEdit(itemType.id)" *ngIf="!loading">
          <i nz-icon nzType="edit" nzTheme="outline"></i>
          <span class="action-text"> {{ "edit" | translate }}</span>
        </a>
        <nz-divider nzType="vertical" *ngIf="!loading"></nz-divider>
        <a nz-typography nzType="danger" (click)="uiService.showDelete(itemType.id)" *ngIf="!loading">
          <i nz-icon nzType="delete" nzTheme="outline"></i>
          <span class="action-text"> {{ "delete" | translate }}</span>
        </a>
        <nz-divider nzType="vertical" *ngIf="!loading"></nz-divider>
        <a nz-typography nzType="" (click)="cancel()">
          <i nz-icon nzType="close" nzTheme="outline"></i>
          <span class="action-text"> {{ "close" | translate }}</span>
        </a>
      </div>
    </div>
  `,
  styleUrls: ['../../../../../node_modules/@sgxbz/shared/assets/styles/operation.page.scss']
})

export class ItemTypeViewComponent implements OnInit, OnDestroy{
  constructor(
    private uiService: ItemTypeUiService,
    private ref: NzModalRef<ItemTypeViewComponent>,
    public itemTypeService: ItemTypeService,
    private fb: FormBuilder
  ) {}
  @Input() id: number;
  loading = false;
  itemType: ItemTypeView = {};
  refreshSub$: any;
  frm: FormGroup;
  ngOnInit(): void {
    this.initControl(this.itemType);
    this.refreshSub$ = this.uiService.refresher.subscribe(
      (e) => {
        console.log(e);
        if (e.key === 'deleted') {
          this.ref.triggerCancel();
        }
        else if (e.key === 'edited'){
          this.itemType = e.value;
          this.frm.setValue({
            itemClass: e.value.itemClass,
            name: e.value.name,
            note: e.value.note,
          });
        }
      },
      err => {
        console.log(err);
      }
    );
    this.find();
  }
  initControl(itemType: ItemTypeView): void{
    this.frm = this.fb.group({
      itemClass: [{value: itemType?.itemClass, disabled: true}, [Validators.required]],
      name: [{value: itemType?.name, disabled: true}, [Validators.required]],
      note: [{value: itemType?.note, disabled: true}, []]
    });
  }
  find(): void{
    this.loading = true;
    this.itemTypeService.find(this.id).subscribe(
      (result: ItemTypeView) => {
        this.loading = false;
        this.itemType = result;
        this.frm.setValue({
          itemClass: result.itemClass,
          name: result.name,
          note: result.note
        });
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

  ngOnDestroy(): void {
    this.refreshSub$?.unsubscribe();
  }
}
