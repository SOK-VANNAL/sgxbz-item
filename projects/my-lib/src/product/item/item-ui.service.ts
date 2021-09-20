import {EventEmitter, Injectable} from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ItemEditComponent } from './item-edit.component';
import { ItemEdit } from './item.service';
import {ItemDeleteComponent} from './item-delete.component';
import {ItemViewComponent} from './item-view.component';
import {ItemAddComponent} from './item-add.component';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root'
})

export class ItemUiService {
  constructor(
    private modalService: NzModalService,
    private notificationService: NzNotificationService
  ) {}
  refresher = new EventEmitter<{key: string, value?: ItemEdit, componentId?: string}>();
  showEdit(id: number): void{
    this.modalService.create({
      nzContent: ItemEditComponent,
      nzComponentParams: {id},
      nzFooter: null,
      nzClosable: false,
      nzMaskClosable: false,
      nzWrapClassName: 'vertical-top-modal',
      nzWidth: '960px',
      nzBodyStyle: {height: '490px'},
      nzOnOk: (e) => {
        this.refresher.emit({key: 'edited', value: e.item});
      }
    });
  }
  showDelete(id: number): void{
    this.modalService.create({
      nzContent: ItemDeleteComponent,
      nzComponentParams: {id},
      nzFooter: null,
      nzClosable: false,
      nzMaskClosable: false,
      nzWrapClassName: 'vertical-top-modal',
      nzWidth: '480px',
      nzBodyStyle: {height: '210px'},
      nzOnOk: (e) => {
        this.refresher.emit({key: 'deleted', value: e.item});
      }
    });
  }
  showView(id: number): void{
    this.modalService.create({
      nzContent: ItemViewComponent,
      nzComponentParams: {id},
      nzFooter: null,
      nzClosable: false,
      nzMaskClosable: false,
      nzWrapClassName: 'vertical-top-modal',
      nzWidth: '960px',
      nzBodyStyle: {height: '490px'},
    });
  }
  showAdd(id?: number, componentId: string = ''): void{
    this.modalService.create({
      nzContent: ItemAddComponent,
      nzComponentParams: {id},
      nzFooter: null,
      nzClosable: false,
      nzMaskClosable: false,
      nzWrapClassName: 'vertical-top-modal',
      nzWidth: '960px',
      nzBodyStyle: {height: '490px'},
      nzOnOk: (e) => {
        this.refresher.emit({key: 'added', value: e.item, componentId});
      }
    });
  }
  showErrorNotification(message: string): void{
    this.notificationService.error('Error', message, {nzStyle: {borderLeft: '4px solid red'}});
  }
}

