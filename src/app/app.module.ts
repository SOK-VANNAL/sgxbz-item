import {RouterModule} from '@angular/router';
import {Observable, from} from 'rxjs';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { TokenHttpInterceptor, MainModule, ROUTES, RandomWaitInterceptor } from '@sgxbz/shared';
import './override';
import { SharedModule } from '@sgxbz/shared';
import { DashboardModule } from '../dashboard/dashboard.module';
import { NgModule } from '@angular/core';
import { ItemModule } from '../../projects/my-lib/src/product/item.module';
import { register_item_module } from '../../projects/my-lib/src/product/product.routes';

console.log('Routers ', ROUTES);
register_item_module()
export class LazyTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return from(import(`../assets/i18n/${lang}.json`));
  }
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: LazyTranslateLoader
      },
      isolate: false,
      defaultLanguage: 'km_KH',
    }),
    SharedModule.forRoot(),
    MainModule,
    DashboardModule,
    ItemModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenHttpInterceptor,
      multi: true,
    }
    ,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: RandomWaitInterceptor,
    //   multi: true,
    // },
    {
      provide: 'SHARE_API_URL',
      useValue: 'https://dev-saleapi.sgx.bz/api'
    },
    {
      provide: 'PRODUCT_API_URL',
      useValue: 'https://sale-api.sgx.bz/api'
    }
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
