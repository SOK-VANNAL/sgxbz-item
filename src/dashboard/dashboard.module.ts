import { NgModule } from '@angular/core';
import { SharedModule } from '@sgxbz/shared';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { ProductSummaryCardComponent } from './components/product-summary-card.component';
import { MainComponent } from './components/main.component';
import { ActionComponent } from './components/action.component';
import { SaleCardComponent } from './components/sale-card.component';
import { RevenueCardComponent } from './components/revenue-card.component';
import { UserCardComponent } from './components/user-card.component';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NgxEchartsModule } from 'ngx-echarts';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';

@NgModule({
  declarations: [
    DashboardComponent,
    ProductSummaryCardComponent,
    MainComponent,
    ActionComponent,
    SaleCardComponent,
    RevenueCardComponent,
    UserCardComponent,
  ],
  exports: [
  ],
  imports: [
    NzTimelineModule,
    CommonModule,
    SharedModule.forRoot(),
    NzProgressModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ]
})
export class DashboardModule {
}



