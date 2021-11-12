import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemList, ItemService } from './item.service';
import {QueryParam, SearchResult} from '@sgxbz/shared';
import {NzTableQueryParams} from 'ng-zorro-antd/table';
import { ItemUiService } from './item-ui.service';
import { Resource } from '@sgxbz/shared';
import { LocalStorageService } from '@sgxbz/shared';

@Component({
  selector: 'app-item-list',
  template: `
    <nz-layout>
      <nz-header style="display: flex; justify-content: space-between">
        <div style="display: flex">
          <div style="width: 220px">
            <app-filter-input storageKey="item-search" (filterChanged)="searchText = $event; param.pageIndex = 1; onSearch()">
            </app-filter-input>
          </div>
<!--          <div style="width: 220px; margin-left: 5px">-->
<!--            <app-item-select storageKey="item-select" [allItemOption]="true"></app-item-select>-->
<!--          </div>-->
          <div style="width: 220px; margin-left: 5px">
            <app-item-type-select storageKey="item-list-select" [addButton]="false" [allItemOption]="true" (selectChanged)="filterItemType = $event; param.pageIndex = 1;  onSearch()"></app-item-type-select>
          </div>
        </div>
        <div>
          <button nz-button nzType="primary" (click)="uiService.showAdd()">
            <i nz-icon nzType="plus" nzTheme="outline"></i>
            {{ 'add_new' | translate}}
          </button>
        </div>
      </nz-header>
      <nz-content>
        <nz-table
          nzSize="small"
          nzShowSizeChanger
          #fixedTable
          nzTableLayout="fixed"
          [nzPageSizeOptions]="pageSizeOption"
          [nzData]="lists"
          [nzLoading]="loading"
          [nzTotal]="param.rowCount"
          [nzPageSize]="param.pageSize"
          [nzPageIndex]="param.pageIndex"
          [nzFrontPagination]="false"
          [nzNoResult]="'row_not_found' | translate"
          (nzQueryParams)="queryParamsChanged($event)"
        >
          <thead>
          <tr>
            <th class="col-header" nzWidth="5%">#</th>
            <th class="col-header" nzColumnKey="code" [nzSortFn]="true" nzWidth="7%">{{ "code" | translate }}</th>
            <th class="col-header" nzColumnKey="name" [nzSortFn]="true" nzWidth="23%">
              {{ "name" | translate }}
            </th>
            <th class="col-header" nzColumnKey="detail" nzWidth="25%">{{ "detail" | translate }}</th>
            <th class="col-header" nzColumnKey="itemClass" nzWidth="15%">{{ "item_type" | translate }}</th>
            <th class="col-header" nzColumnKey="note" nzWidth="25%">{{ "note" | translate }}</th>
            <th class="col-header" nzWidth="135px"></th>
          </tr>
          </thead>
          <tbody>
          <tr *ngFor="let item of lists; let i = index">
            <td>{{ i | rowNumber: {index: param.pageIndex, size: param.pageSize} }}</td>
            <td nzEllipsis><a (click)="uiService.showView(item.id)">{{item.code}}</a></td>
            <td nzEllipsis>{{item.name }}</td>
            <td nzEllipsis>{{ item.detail }}</td>
            <td nzEllipsis>{{ item.itemType }}</td>
            <td nzEllipsis>{{item.note }}</td>
            <td nzEllipsis class="action-row">
              <a
                [nzDropdownMenu]="menu"
                class="action-button"
                nz-dropdown
                nzTrigger="click"
                nzPlacement="bottomRight"
              >
                <!--                <i class="fas fa-ellipsis-h"></i>-->
                <i nz-icon nzType="ellipsis" nzTheme="outline" style="font-size: 22px"></i>
              </a>
              <nz-dropdown-menu #menu="nzDropdownMenu">
                <ul nz-menu nzSelectable>
                  <li class="menu-item" nz-menu-item>
                    <a (click)="uiService.showEdit(item.id)">
                      <i nz-icon nzType="edit"></i>&nbsp;
                      <span class="action-text"> {{ "edit" | translate }}</span>
                    </a>
                  </li>
                  <li class="menu-item" nz-menu-item>
                    <a (click)="uiService.showDelete(item.id)">
                      <i nz-icon nzType="delete"></i>&nbsp;
                      <span class="action-text"> {{ "delete" | translate }}</span>
                    </a>
                  </li>
                  <li class="menu-item" nz-menu-item>
                    <a (click)="uiService.showAdd(item.id)">
                      <i nz-icon nzType="copy"></i>&nbsp;
                      <span class="action-text"> {{ "copy" | translate }}</span>
                    </a>
                  </li>
                </ul>
              </nz-dropdown-menu>
            </td>
          </tr>
          </tbody>
        </nz-table>
      </nz-content>
    </nz-layout>
  `,
  styleUrls: ['../../share/styles/default-page-style.scss'],
})

export class ItemListComponent implements OnInit, OnDestroy {
  constructor(
    private itemService: ItemService,
    public uiService: ItemUiService,
    public localStorageService: LocalStorageService
  ) {
  }
  pageSizeOption = Resource.pageSizeOption;
  pageSizeOptionKey = 'item-list';
  refreshSub$: any;
  loading = false;
  searchText = '';
  filterItemType: number = null;
  lists: ItemList[] = [];
  param: QueryParam = {
    pageSize: this.localStorageService.getCurrentPageSizeOption(this.pageSizeOptionKey) ?? 10,
    pageIndex: 1,
    sorts: 'name'
  };

  ngOnInit(): void {
    this.loading = true;
    setTimeout( () => {
      this.loading = false;
      this.onSearch();
      this.refreshSub$ = this.uiService.refresher.subscribe(
        (e) => {
          this.loading = false;
          this.onSearch();
        },
        err => {
          console.log(err);
        }
      );
   }, 250);
  }

  onSearch(): void {
    if (this.loading) {
      return;
    }
    this.loading = true;
    this.filterItemType ? this.param.filters = JSON.stringify([{field: 'search', operator: 'contains', value: this.searchText}, {field: 'itemTypeId', operator: 'eq', value: JSON.stringify(this.filterItemType)}])
      : this.param.filters = JSON.stringify([{field: 'search', operator: 'contains', value: this.searchText}]);
    this.itemService.search(this.param).subscribe(
      (result: SearchResult<ItemList>) => {
        this.loading = false;
        this.lists = result.results;
        this.param.rowCount = result.param.rowCount;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  queryParamsChanged(param: NzTableQueryParams): void{
    const {pageSize, pageIndex, sort} = param;
    const sortFound = sort.find(x => x.value);
    this.param.sorts = (sortFound?.key ?? 'name') + (sortFound?.value === 'descend' ? '-' : '');
    if (sortFound?.key === 'code'){
      this.param.sorts = (sortFound?.key ?? 'code') + (sortFound?.value === 'descend' ? '-' : '');
    }
    this.param.pageSize = pageSize;
    this.param.pageIndex = pageIndex;
    this.localStorageService.setPageSizeOptionKey(pageSize, this.pageSizeOptionKey);
    this.onSearch();
  }

  ngOnDestroy(): void {
    this.refreshSub$?.unsubscribe();
  }
}

