import {HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LogicHelperService, MessageHelperService, ProgressBarService, SettingList} from '@sgxbz/shared';
import {SysSettingService} from '@sgxbz/shared';
import { concat } from 'rxjs';
import {concatAll, map} from 'rxjs/operators';

@Component({
  selector: 'app-item-setting',
  template: `
    <div nz-row>
      <div nz-col nzSpan="12">
        <form nz-form *ngIf="frm" [formGroup]="frm" (ngSubmit)="submit()">
          <nz-form-item>
            <nz-form-label [nzSm]="7" [nzXs]="24" nzRequired>
              {{ "item_code" | translate }}
            </nz-form-label>
            <nz-form-control [nzSm]="14" [nzXs]="24" nzErrorTip="">
              <app-autonumber-select formControlName="item-autoid" [withBlankItem]="true"></app-autonumber-select>
            </nz-form-control>
          </nz-form-item>
          <nz-form-item>
            <nz-form-control
              [nzXs]="{ span: 24, offset: 0 }"
              [nzSm]="{ span: 10, offset: 7 }"
            ><button [nzLoading]="loading" nz-button nzType="primary" [disabled]="frm.invalid">
              {{ "save" | translate }}
            </button>
            </nz-form-control>
          </nz-form-item>
        </form>
      </div>
    </div>
  `,
  styles: [``],
})
export class SettingComponent implements OnInit {
  frm: FormGroup;
  keys = ['item-autoid'];
  setting: SettingList;
  loading: boolean;
  constructor(
    private fb: FormBuilder,
    private logic: LogicHelperService,
    private progress: ProgressBarService,
    private message: MessageHelperService,
    private settingService: SysSettingService
  ) {
  }
  submit(): void {
    if (this.loading){return; }
    if (!this.frm.valid) {  return; }

    this.loading = true;
    this.keys.forEach(key => {
      this.setting.set(key, this.frm.controls[key].value);
    });

    const update$ = this.settingService
      .updateAll(this.setting.items)
      .pipe(map(result => console.log('update$')));
    const reinit$ = this.settingService.initCurrentSetting()
      .pipe(map(result => {
        this.logic.emitSettingValue(result.items);
        this.loading = false;
        this.message.showSuccess();
      }));
    concat(update$, reinit$)
      .subscribe(
        (data) => {},
        (err: HttpErrorResponse) => {
          this.loading = false;
          this.message.msgHttpErr(err);
        }
      );
  }
  initControl(): void {
    this.frm = this.fb.group({
      'item-autoid': [null, []],
    });
  }

  ngOnInit(): void {
    this.initControl();
    setTimeout(() => {
      this.settingService
        .getItems(this.keys)
        .subscribe(
          (result) => {
            this.setting = result;
            let obj = result.toObject();
            obj['item-autoid'] = +(obj['item-autoid']); // convert to number
            this.frm.setValue(obj);
            console.log(this.frm.value)
          },
          (err: HttpErrorResponse) => this.message.msgHttpErr(err)
        );
    }, 100);
  }
}
