import { Component } from '@angular/core';

@Component({
  selector: 'app-sale-card',
  template: `
    <nz-card
      style="height: 100%"
      [nzBodyStyle]="{padding: '16px'}">
      <div nz-row nzJustify="space-between">
        <h2 style="font-size: 16px">{{'daily_sale_report' | translate}}</h2>
        <i nz-icon nzType="clock-circle" nzTheme="outline" style="color: #99A3A4; font-size: 18px"></i>
      </div>
      <h2 style="font-size: 42px; color: black">{{percent}}%</h2>
      <nz-progress [nzPercent]="percent" [nzStrokeWidth]="16" [nzShowInfo]="false" nzStrokeColor="#359EFF"></nz-progress>
    </nz-card>
  `,
  styles: [`
    h1, h2, h3, h4, h5, h6, p {
      margin: 0px;
    }
  `]
})

export class SaleCardComponent {
  constructor() {
  }
  percent = 30;
}
