import {RouterModule} from '@angular/router';
import {Observable, from} from 'rxjs';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { TokenHttpInterceptor, MainModule, ROUTES, RandomWaitInterceptor } from '@sgxbz/shared';
import './override';
import { SharedModule } from '@sgxbz/shared';
import { ProductModule, register_module} from 'my-lib';
import { DashboardModule } from '../dashboard/dashboard.module';
import { NgModule } from '@angular/core';

console.log('Routers ', ROUTES);
register_module();
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
    ProductModule,
    DashboardModule
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
      provide: 'PRODUCT_API_URL',
      useValue: 'https://sale-api.sgx.bz/api'
    }
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
