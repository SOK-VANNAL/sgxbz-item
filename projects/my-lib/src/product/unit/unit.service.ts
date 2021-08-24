import { Injectable, Inject } from '@angular/core';
import {BaseApiService, QueryParam} from '@sgxbz/shared';
import { HttpClient } from '@angular/common/http';

export interface UnitList{
  id?: number;
  name?: string;
  note?: string;
}
export interface UnitEdit {
  id?: number;
  name?: string;
  note?: string;
}
export interface UnitDelete {
  id?: number;
  name?: string;
  note?: string;
}
export interface UnitAdd {
  name?: string;
  note?: string;
}
export interface UnitView {
  id?: number;
  name?: string;
  note?: string;
}

@Injectable({
  providedIn: 'root'
})

export class UnitService  extends BaseApiService<any> {
  constructor(private http: HttpClient, @Inject('PRODUCT_API_URL') public url: string) {
    super('unit', http);
    this.url = url;
  }
//   public exists(name: string, id: number = 0, params: {key: string; val: any }[]= []): Observable<boolean> {
//     if (!params){
//       params = [];
//     }
//     let httpParams = new HttpParams();
//     params.forEach(pair => {
//       httpParams = httpParams.append(pair.key,  pair.val);
//     });
//     httpParams =  httpParams.append('id', `${id}`);
//     if (name){
//       httpParams =   httpParams.append('name', name);
//     }
//     return this.http.get<boolean>(`${this.getUrl()}/exists`, {
//     params: httpParams
//   });
// }
  // search(param: QueryParam): Observable<any>{
  //   const params = new HttpParams()
  //     .set('pageIndex', JSON.stringify(param.pageIndex))
  //     .set('pageSize', JSON.stringify(param.pageSize))
  //     .set('sorts', param.sorts)
  //     .set('filters', param.filters);
  //   return this.http.get<any>('https://sale-api.sgx.bz/api/Unit?', {params});
  // }
  // find(id: number): Observable<any>{
  //   return this.http.get<any>(`https://sale-api.sgx.bz/api/Unit/${id}`);
  // }
  // edit(unit: UnitEdit): Observable<any> {
  //   return this.http.put<any>(`https://sale-api.sgx.bz/api/Unit/${unit.id}`, unit);
  // }
  // delete(unit: UnitDelete): Observable<any> {
  //   const option = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     }),
  //     body: unit
  //   };
  //   return this.http.delete<any>(`https://sale-api.sgx.bz/api/Unit/${unit.id}`, option);
  // }
  // add(unit: UnitAdd): Observable<any> {
  //   return this.http.post<any>(`https://sale-api.sgx.bz/api/Unit`, unit);
  // }
  // getRecentSelect(storageKey: string): any {
  //   let selectedData = [];
  //   if (localStorage.getItem('recent-select')){
  //     selectedData = JSON.parse(localStorage.getItem('recent-select'));
  //   }
  //   let recentSelect = [];
  //   recentSelect = selectedData.filter(item => item.key === storageKey);
  //   if (recentSelect.length > 0){
  //     return  recentSelect[0].val;
  //   }
  //   else {
  //     return;
  //   }
  // }
  // setRecentSelect(storageKey: string, value: any): void{
  //   let selectedData = [];
  //   if (localStorage.getItem('recent-select')){
  //     selectedData = JSON.parse(localStorage.getItem('recent-select'));
  //   }
  //   const setValue = {
  //     key: storageKey,
  //     val: value
  //   };
  //   if (selectedData.length > 0){
  //     let overlap = false;
  //     selectedData.forEach(item => {
  //       if (item.key === storageKey){
  //         item.val = value;
  //         overlap = true;
  //       }
  //     });
  //     if (!overlap){
  //       selectedData.push(setValue);
  //     }
  //   }
  //   else {
  //     selectedData.push(setValue);
  //   }
  //   localStorage.setItem('recent-select', JSON.stringify(selectedData));
  // }
}
