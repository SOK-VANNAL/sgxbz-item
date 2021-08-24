import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BaseApiService } from '@sgxbz/shared';


export interface ItemTypeList {
  id?: number;
  itemClass?: number;
  name?: string;
  note?: string;
}
export interface ItemTypeEdit {
  id?: number;
  itemClass?: number;
  name?: string;
  note?: string;
}
export interface ItemTypeDelete {
  id?: number;
  itemClass?: number;
  name?: string;
  note?: string;
}
export interface ItemTypeView {
  id?: number;
  itemClass?: number;
  name?: string;
  note?: string;
}
export interface ItemTypeAdd {
  id?: number;
  itemClass?: number;
  name?: string;
  note?: string;
}


@Injectable({
  providedIn: 'root'
})
export class ItemTypeService extends BaseApiService<any>{
  constructor( private http: HttpClient,
               @Inject('PRODUCT_API_URL') public url: string) {
    super('itemType', http);
    this.url = url;
  }

}
