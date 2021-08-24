import { Injectable, Inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BaseApiService } from '@sgxbz/shared';


export interface ItemList {
  id?: number;
  code?: string;
  name?: string;
  detail?: string;
  note?: string;
  image?: string;
  itemTypeId?: number;
  itemType?: string;
  barcode?: string;
  unitId?: number;
  cost?: number;
  price?: number;
  isPurchase?: boolean;
  isSale?: boolean;
  tags?: string;
  variants?: Variants[];
}
export interface Variants {
  id?: number;
  code?: string;
  name?: string;
  barcode?: string;
  unitId?: number;
  price?: number;
  cost?: number;
  multiplier?: number;
}
export interface ItemEdit {
  id?: number;
  code?: string;
  name?: string;
  detail?: string;
  note?: string;
  image?: string;
  itemTypeId?: number;
  itemType?: string;
  barcode?: string;
  unitId?: number;
  cost?: number;
  price?: number;
  isPurchase?: boolean;
  isSale?: boolean;
  tags?: string;
  variants?: Variants[];
}
export interface ItemDelete {
  id?: number;
  code?: string;
  name?: string;
  detail?: string;
  note?: string;
  image?: string;
  itemTypeId?: number;
  itemType?: string;
  barcode?: string;
  unitId?: number;
  cost?: number;
  price?: number;
  isPurchase?: boolean;
  isSale?: boolean;
  tags?: string;
  variants?: Variants[];
}
export interface ItemView {
  id?: number;
  code?: string;
  name?: string;
  detail?: string;
  note?: string;
  image?: string;
  itemTypeId?: number;
  itemType?: string;
  barcode?: string;
  unitId?: number;
  cost?: number;
  price?: number;
  isPurchase?: boolean;
  isSale?: boolean;
  tags?: string;
  variants?: Variants[];
}
export interface ItemAdd {
  id?: number;
  code?: string;
  name?: string;
  detail?: string;
  note?: string;
  image?: string;
  itemTypeId?: number;
  itemType?: string;
  barcode?: string;
  unitId?: number;
  cost?: number;
  price?: number;
  isPurchase?: boolean;
  isSale?: boolean;
  tags?: string;
  variants?: Variants[];
}
@Injectable({
  providedIn: 'root'
})

export class ItemService extends BaseApiService<any>{
  constructor(private http: HttpClient, @Inject('PRODUCT_API_URL') public url: string) {
    super('item', http);
    this.url = url;
  }
  // search(param: QueryParam): Observable<any>{
  //   const params = new HttpParams()
  //     .set('pageIndex', JSON.stringify(param.pageIndex))
  //     .set('pageSize', JSON.stringify(param.pageSize))
  //     .set('sorts', param.sorts)
  //     .set('filters', param.filters);
  //   return this.http.get<any>('https://sale-api.sgx.bz/api/item', {params});
  // }
  // find(id: number): Observable<any>{
  //   return this.http.get(`https://sale-api.sgx.bz/api/item/${id}`);
  // }
  // edit(item: ItemEdit): Observable<any>{
  //   return this.http.put(`https://sale-api.sgx.bz/api/item/${item.id}`, item);
  // }
}

