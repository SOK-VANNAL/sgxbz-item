import { Component, forwardRef, Input, OnInit, OnDestroy, ViewChild, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ItemTypeList, ItemTypeService} from './item-type.service';
import {QueryParam, SearchResult, LocalStorageService} from '@sgxbz/shared';
import { ItemTypeUiService } from './item-type-ui.service';
import {NzSelectComponent} from 'ng-zorro-antd/select';
import { BehaviorSubject } from 'rxjs';
import {debounceTime, map, switchMap} from 'rxjs/operators';
import { EventEmitter } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-item-type-select',
  template: `
    <nz-select
      #component
      (nzOnSearch)=" searchText = $event ; param.pageIndex = 1; onSearching($event)"
      [(ngModel)]="val"
      [nzDropdownRender]="actionItem"
      [nzOpen]="false"
      [nzShowSearch]="true"
      (nzScrollToBottom) = "loadNextData()"
      (ngModelChange) = "updateStorageKey($event)"
      [disabled]="disabled"
      appFocus
      nzServerSearch
    >
      <nz-option *ngIf="!loading && allItemOption" [nzLabel]=" 'all_item_type' | translate" [nzValue]="-1"></nz-option>
      <ng-container *ngFor="let item of lists">
        <nz-option *ngIf="!loading" [nzLabel]="item.name" [nzValue]="item.id"></nz-option>
      </ng-container>

      <nz-option *ngIf="loading" nzCustomContent nzDisabled>
        <i class="loading-icon" nz-icon nzType="loading"></i>
        {{"loading" | translate}}
      </nz-option>
      <nz-option *ngIf="loadMoreData && !loading" nzCustomContent nzDisabled>
        <i class="loading-icon" nz-icon nzType="loading"></i>
        {{"loading" | translate}}
      </nz-option>

      <ng-template #actionItem>
        <a (click)=" select.nzOpen = false; uiService.showAdd(componentId)" class="item-action" *ngIf="addButton">
          <i nz-icon nzType="plus"></i> {{ "add_new" | translate }}
        </a>
      </ng-template>
    </nz-select>
  `,
  styles: [`
    nz-select {
      width: 100%;
    }
    .item-action {
      flex: 0 0 auto;
      padding: 6px 8px;
      display: block;
    }
  `],
  providers: [
    {       provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ItemTypeSelectComponent),
      multi: true
    }
  ]
})

export class ItemTypeSelectComponent implements ControlValueAccessor, OnInit, OnDestroy{
  constructor(
    private itemTypeService: ItemTypeService,
    private uiService: ItemTypeUiService,
    private localStorageService: LocalStorageService
  ) {}
  @ViewChild('component') select: NzSelectComponent;
  @Input() storageKey: string;
  @Input() addButton = true;
  @Input() allItemOption = true;
  @Output() selectChanged: EventEmitter<any> = new EventEmitter();
  componentId = uuidv4();
  loading = false;
  loadMoreData = false;
  lists: ItemTypeList[] = [];
  searchText = '';
  val: number;
  refreshSub$: any;
  disabled = false;
  filterSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  param: QueryParam = {
    pageSize: 10,
    pageIndex: 1,
    sorts: 'name',
  };
  onChange: any = () => {};
  onTouch: any = () => {};
  set value(val) {
      this.val = val;
      this.onChange(val);
      this.onTouch(val);
  }
  writeValue(value: any): void {
    this.val = value;
    if (!this.storageKey && this.val){
      this.itemTypeService.find(this.val).subscribe(
        result => {
          this.lists.push(result);
        },
        err => {
          console.log(err);
        }
      );
    }
  }
  registerOnChange(fn: any): void{
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void{
    this.onTouch = fn;

  }

  ngOnInit(): void {
    this.refreshSub$ = this.uiService.refresher.subscribe(
      (e) => {
        if (e.key === 'added' && e?.value?.id && e.componentId === this.componentId) {
          this.lists.push(e.value);
          setTimeout(() => {
            this.value = e.value.id;
          }, 250);
          this.updateStorageKey(e.value.id);
        }
        if (e.key === 'deleted'){
          if (this.val === e.value.id){
            this.val = null;
            this.lists = this.lists.filter(unit => unit.id !== e.value.id);
          }
        }
      }
    );
    if (this.storageKey){
      let recentSelected: ItemTypeList[];
      this.localStorageService.getValue(this.storageKey) ? recentSelected = this.localStorageService.getValue(this.storageKey) : recentSelected = [];
      if (recentSelected.length > 0){
        this.lists.push(recentSelected[0]);
        this.val = recentSelected[0].id;
        this.selectChanged.emit(this.val);
      }
      else {
        this.val = -1;
        this.selectChanged.emit('');
      }
    }
    this.initSearch();
  }
  onSearching(filter: string): void{
    this.loading = true;
    this.filterSubject.next(filter);
    this.searchText = filter;
  }
  initSearch(): void{
    const searchResult = (name: string) =>
      this.itemTypeService.search({
        pageIndex: 1,
        pageSize: 10,
        sorts: 'name',
        filters: JSON.stringify([
          {field: 'search', operator: 'contains', value: `${name}`},
        ]),
      }).pipe(map((res: SearchResult<ItemTypeList>) => res.results));

    this.filterSubject
      .asObservable()
      .pipe(debounceTime(300))
      .pipe(switchMap(searchResult))
      .subscribe(
        (data) => {
          this.lists = data;
          this.loading = false;
        },
        (err) => {
          console.log(err);
        }
      );
  }
  loadNextData(): void{
    this.param.pageIndex++;
    this.loadMoreData = true;
    this.param.filters = JSON.stringify([{field: 'search', operator: 'contains', value: this.searchText}]);
    this.itemTypeService.search(this.param).subscribe(
      result => {
        this.loadMoreData = false;
        if (result.results.length > 0){
          this.lists.push(...result.results);
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  updateStorageKey(value: any): void {
    if (this.storageKey){
      const selectedItem = this.lists.filter( item => item.id === value);
      this.localStorageService.setValue({key: this.storageKey, value: selectedItem});
    }
    if (this.val === -1){
      this.selectChanged.emit('');
    }
    else {
      this.selectChanged.emit(this.val);
    }
    this.value = value;
  }
  ngOnDestroy(): void {
    this.refreshSub$?.unsubscribe();
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}

