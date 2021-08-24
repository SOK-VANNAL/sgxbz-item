import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { UnitView, UnitService } from './unit.service';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { UnitUiService } from './unit-ui.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-unit-view',
  template: `
    <div *nzModalTitle>
      <span>{{ (unit?.name || ('loading'|translate)) | textLimit:30}}</span>
    </div>
    <div class="modal-content">
      <nz-spin *ngIf="loading"></nz-spin>
      <form nz-form [formGroup]="frm">
        <nz-form-item>
          <nz-form-label [nzSm]="8" [nzXs]="24" nzRequired>{{
            "name" | translate
            }}</nz-form-label>
          <nz-form-control [nzSm]="14" [nzXs]="24" nzErrorTip="">
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
      </form>

      <div *nzModalFooter>
        <a (click)="uiService.showEdit(unit.id)" *ngIf="!loading">
          <i nz-icon nzType="edit" nzTheme="outline"></i>
          <span class="action-text"> {{ "edit" | translate }}</span>
        </a>
        <nz-divider nzType="vertical" *ngIf="!loading"></nz-divider>
        <a nz-typography nzType="danger" (click)="uiService.showDelete(unit.id)" *ngIf="!loading">
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
  styles: [`
    .modal-content{
      padding: 20px;
    }
  `],
})
export class UnitViewComponent implements OnInit, OnDestroy{
  constructor(
    private ref: NzModalRef<UnitViewComponent>,
    private unitService: UnitService,
    private uiService: UnitUiService,
    private fb: FormBuilder
  ) {}
  @Input() id: number;
  loading = false;
  refreshSub$: any;
  unit: UnitView = {};
  frm: FormGroup;

  ngOnInit(): void {
    this.initControl(this.unit);
    this.refreshSub$ = this.uiService.refresher.subscribe(
      (e) => {
        if (e.key === 'deleted') {
          this.ref.triggerCancel();
        }
        else if (e.key === 'edited'){
          this.unit = e.value;
          this.frm.setValue({
            name: e.value.name,
            note: e.value.note
          });
        }
      },
      err => {
        console.log(err);
      }
    );
    this.find();
  }
  initControl(unit: UnitView): void{
    this.frm = this.fb.group({
      name: [{value: unit?.name, disabled: true}, [Validators.required]],
      note: [{value: unit?.note, disabled: true}]
    });
  }
  cancel(): void{
    this.ref.triggerCancel();
  }
  find(): void{
    this.loading = true;
    this.unitService.find(this.id).subscribe(
      (result: UnitView) => {
        this.loading = false;
        this.unit = result;
        this.frm.setValue({
          name: result.name,
          note: result.note
        });
      },
      err => {
        console.log(err);
      }
    );
  }
  ngOnDestroy(): void {
    this.refreshSub$?.unsubscribe();
  }
}
