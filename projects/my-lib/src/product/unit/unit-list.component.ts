import { Component, OnInit, OnDestroy} from '@angular/core';
import { QueryParam, SearchResult } from '@sgxbz/shared';
import { UnitList, UnitService } from './unit.service';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { UnitUiService } from './unit-ui.service';
import { LocalStorageService } from '@sgxbz/shared';
import { Resource } from '@sgxbz/shared';

@Component({
  selector: 'app-unit-list',
  template: `
    <nz-layout>
      <nz-header style="display: flex; justify-content: space-between">
        <div style="width: 220px">
          <app-filter-input storageKey="unit-search" (filterChanged)="searchText=$event; param.pageIndex = 1;onSearch()">
          </app-filter-input>
<!--          <app-unit-select storageKey="unit-select"></app-unit-select>-->
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
          [nzPageSizeOptions] = "pageSizeOption"
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
            <th class="col-header" nzColumnKey="name" [nzSortFn]="true" nzWidth="30%">
              {{ "name" | translate }}
            </th>
            <th class="col-header" nzColumnKey="note" nzWidth="55%">{{ "note" | translate }}</th>
            <th class="col-header" nzWidth="135px"></th>
          </tr>
          </thead>
          <tbody>
          <tr *ngFor="let item of lists; let i = index">
            <td>{{ i | rowNumber: {index: param.pageIndex, size: param.pageSize} }}</td>
            <td nzEllipsis>
              <a (click)="uiService.showView(item.id)">{{
                item.name
                }}</a>
            </td>
            <td nzEllipsis>{{ item.note }}</td>
            <td class="action-row">
              <a (click)="uiService.showEdit(item.id)" >
                <i nz-icon nzType="edit" nzTheme="outline"></i>
                <span class="action-text"> {{ "edit" | translate }}</span>
              </a>
              <nz-divider nzType="vertical"></nz-divider>
              <a nz-typography nzType="danger" (click)="uiService.showDelete(item.id)">
                <i nz-icon nzType="delete" nzTheme="outline"></i>
                <span class="action-text"> {{ "delete" | translate }}</span>
              </a>
            </td>
          </tr>
          </tbody>
        </nz-table>
      </nz-content>
    </nz-layout>
  `,
  styleUrls: ['../../share/styles/default-page-style.scss'],
})

export class UnitListComponent implements OnInit, OnDestroy{
  constructor(
    private unitService: UnitService,
    public uiService: UnitUiService,
    public localStorageService: LocalStorageService
  ) {}
  pageSizeOption = Resource.pageSizeOption;
  pageSizeOptionKey = 'unit-list';
  loading = false;
  searchText = '';
  refreshSub$: any;
  lists: UnitList[] = [];
  param: QueryParam = {
    pageSize: this.localStorageService.getCurrentPageSizeOption(this.pageSizeOptionKey) ?? 10,
    pageIndex: 1,
    sorts: 'name'
  };
  ngOnInit(): void {
    this.loading = true;
    setTimeout(() => {
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
  onSearch(): void{
    if (this.loading){ return; }
    this.loading = true;
    this.param.filters = JSON.stringify([{ field: 'search', operator: 'contains', value: this.searchText }]);
    this.unitService.search(this.param).subscribe(
      (result: SearchResult<UnitList>) => {
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
      const { pageSize, pageIndex, sort } = param;
      const sortFound = sort.find(x => x.value);
      this.param.sorts = (sortFound?.key ?? 'name') + (sortFound?.value === 'descend' ? '-' : '');
      this.param.pageSize = pageSize;
      this.param.pageIndex = pageIndex;
      this.localStorageService.setPageSizeOptionKey(pageSize, this.pageSizeOptionKey);
      this.onSearch();
  }

  ngOnDestroy(): void {
    this.refreshSub$?.unsubscribe();
  }
}
