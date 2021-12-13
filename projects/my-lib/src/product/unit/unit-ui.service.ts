import {EventEmitter, Injectable} from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UnitEditComponent } from './unit-edit.component';
import { UnitEdit } from './unit.service';
import {UnitDeleteComponent} from './unit-delete.component';
import {UnitAddComponent} from './unit-add.component';
import {UnitViewComponent} from './unit-view.component';

@Injectable({
  providedIn: 'root'
})

export class UnitUiService {
  constructor(
    private modalService: NzModalService
  ) {}
  refresher = new EventEmitter<{key: string, value?: UnitEdit, componentId?: string}>();

  showEdit(id: number): void{
    this.modalService.create({
      nzContent: UnitEditComponent,
      nzComponentParams: {id},
      nzFooter: null,
      nzClosable: false,
      nzMaskClosable: false,
      nzWrapClassName: 'vertical-top-modal',
      nzWidth: '480px',
      nzBodyStyle: {height: '210px'},
      nzOnOk: (e) => {
        this.refresher.emit({key: 'edited', value: e.unit});
      }
    });
  }
  showDelete(id: number): void{
    this.modalService.create({
      nzContent: UnitDeleteComponent,
      nzComponentParams: {id},
      nzFooter: null,
      nzClosable: false,
      nzMaskClosable: false,
      nzWrapClassName: 'vertical-top-modal',
      nzWidth: '480px',
      nzBodyStyle: {height: '210px'},
      nzOnOk: (e) => {
        this.refresher.emit({key: 'deleted', value: e.unit});
      }
    });
  }
  showAdd(componentId: string = ''): void{
    this.modalService.create({
      nzContent: UnitAddComponent,
      nzFooter: null,
      nzClosable: false,
      nzMaskClosable: false,
      nzWrapClassName: 'vertical-top-modal',
      nzWidth: '480px',
      nzBodyStyle: {height: '210px'},
      nzOnOk: (e) => {
        this.refresher.emit({key: 'added', value: e.unit, componentId});
      }
    });
  }
  showView(id: number): void {
    this.modalService.create({
      nzContent: UnitViewComponent,
      nzComponentParams: {id},
      nzFooter: null,
      nzClosable: false,
      nzMaskClosable: false,
      nzWrapClassName: 'vertical-top-modal',
      nzWidth: '480px',
      nzBodyStyle: {height: '210px'},
    });
  }
}
