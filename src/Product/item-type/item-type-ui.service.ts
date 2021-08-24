import {EventEmitter, Injectable} from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ItemTypeEditComponent } from './item-type-edit.component';
import { ItemTypeEdit } from './item-type.service';
import {ItemTypeDeleteComponent } from './item-type-delete.component';
import {ItemTypeViewComponent} from './item-type-view.component';
import {ItemTypeAddComponent} from './item-type-add.component';

@Injectable({
  providedIn: 'root'
})

export class ItemTypeUiService {
  constructor(
    private modalService: NzModalService
  ) {}
  refresher = new EventEmitter<{key: string, value?: ItemTypeEdit, componentId?: string}>();
  showEdit(id: number): void{
    this.modalService.create({
      nzTitle: 'add item_type',
      nzContent: ItemTypeEditComponent,
      nzComponentParams: {id},
      nzFooter: null,
      nzClosable: false,
      nzMaskClosable: false,
      nzWrapClassName: 'vertical-top-modal',
      nzWidth: '480px',
      nzBodyStyle: {height: '270px'},
      nzOnOk: (e) => {
        this.refresher.emit({key: 'edited', value: e.itemType});
      }
    });
  }
  showDelete(id: number): void{
    this.modalService.create({
      nzTitle: 'Delete item_type',
      nzContent: ItemTypeDeleteComponent,
      nzComponentParams: {id},
      nzFooter: null,
      nzClosable: false,
      nzMaskClosable: false,
      nzWrapClassName: 'vertical-top-modal',
      nzWidth: '480px',
      nzBodyStyle: {height: '270px'},
      nzOnOk: (e) => {
        this.refresher.emit({key: 'deleted', value: e.itemType});
      }
    });
  }
  showView(id: number): void{
    this.modalService.create({
      nzTitle: 'View item_type',
      nzContent: ItemTypeViewComponent,
      nzComponentParams: {id},
      nzFooter: null,
      nzClosable: false,
      nzMaskClosable: false,
      nzWrapClassName: 'vertical-top-modal',
      nzWidth: '480px',
      nzBodyStyle: {height: '270px'},
    });
  }
  showAdd(componentId: string = ''): void{
    this.modalService.create({
      nzTitle: 'Add item_type',
      nzContent: ItemTypeAddComponent,
      nzFooter: null,
      nzClosable: false,
      nzMaskClosable: false,
      nzWrapClassName: 'vertical-top-modal',
      nzWidth: '480px',
      nzBodyStyle: {height: '270px'},
      nzOnOk: (e) => {
        this.refresher.emit({key: 'added', value: e.itemType, componentId});
      }
    });
  }
}

